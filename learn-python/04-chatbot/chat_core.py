"""Chat logic with no Streamlit in it, so it can be tested on its own.

Providers:
    OpenAIProvider -> any OpenAI-compatible API (OpenAI, Groq, Together, a local
                      Ollama/LM Studio server...). Set base_url to switch.
    EchoProvider   -> offline stand-in: no key, no network, no cost.
"""

from __future__ import annotations

import time
from dataclasses import dataclass, field
from typing import Iterator, Protocol

Message = dict[str, str]       # {"role": "user" | "assistant" | "system", "content": "..."}


class ChatError(Exception):
    """A problem worth showing the user (bad key, rate limit, model offline...)."""


class Provider(Protocol):
    """Anything with this method can power the chatbot. That's the whole contract."""

    def stream(self, messages: list[Message], model: str, temperature: float) -> Iterator[str]: ...


# ------------------------------------------------------------------ providers

class EchoProvider:
    """Pretends to be a model. Great for building the UI and for tests."""

    def __init__(self, delay: float = 0.02):
        self.delay = delay

    def stream(self, messages, model, temperature):
        last = next((m["content"] for m in reversed(messages) if m["role"] == "user"), "")
        reply = (f"(offline echo mode, {len(messages)} messages in context) You said: {last}\n\n"
                 "Add an API key in the sidebar to talk to a real model.")
        for word in reply.split(" "):
            time.sleep(self.delay)
            yield word + " "


class OpenAIProvider:
    def __init__(self, api_key: str, base_url: str | None = None, timeout: float = 60.0):
        from openai import OpenAI          # imported here so echo mode works without the package
        self.client = OpenAI(api_key=api_key, base_url=base_url or None,
                             timeout=timeout, max_retries=2)

    def stream(self, messages, model, temperature):
        import openai
        try:
            response = self.client.chat.completions.create(
                model=model, messages=messages, temperature=temperature, stream=True,
            )
            for chunk in response:
                if chunk.choices and (text := chunk.choices[0].delta.content):
                    yield text
        except openai.AuthenticationError:
            raise ChatError("The API key was rejected. Check it and try again.")
        except openai.RateLimitError:
            raise ChatError("Rate limit or quota reached. Wait a bit, or check your billing.")
        except openai.NotFoundError:
            raise ChatError(f"Model {model!r} wasn't found at this endpoint.")
        except openai.APIConnectionError:
            raise ChatError("Couldn't connect to the API. Check the base URL and your network.")
        except openai.APIError as err:
            raise ChatError(f"The API returned an error: {err}")


# ---------------------------------------------------------- context window

def estimate_tokens(text: str) -> int:
    """Rough rule: about 4 characters per token in English. Good enough for budgeting."""
    return len(text) // 4 + 1


def fit_to_budget(system_prompt: str, history: list[Message], max_tokens: int) -> list[Message]:
    """Keep the system prompt plus the newest messages that fit in max_tokens.

    Models have a fixed context window, and every token is paid for. The oldest
    turns are dropped first; the system prompt and latest user message always stay.
    """
    system = [{"role": "system", "content": system_prompt}] if system_prompt.strip() else []
    budget = max_tokens - sum(estimate_tokens(m["content"]) for m in system)
    kept: list[Message] = []
    for msg in reversed(history):
        cost = estimate_tokens(msg["content"])
        if kept and cost > budget:        # always keep at least the newest message
            break
        kept.append(msg)
        budget -= cost
    kept.reverse()
    # Don't start the history with an orphaned assistant reply.
    while len(kept) > 1 and kept[0]["role"] == "assistant":
        kept.pop(0)
    return system + kept


# ------------------------------------------------------------------- session

@dataclass
class ChatSession:
    provider: Provider
    model: str = "gpt-4o-mini"
    system_prompt: str = "You are a helpful, concise assistant."
    temperature: float = 0.7
    context_tokens: int = 6000
    history: list[Message] = field(default_factory=list)

    def send(self, user_text: str) -> Iterator[str]:
        """Add the user's message, stream the reply, and save it when complete."""
        user_text = user_text.strip()
        if not user_text:
            raise ChatError("Message is empty.")
        self.history.append({"role": "user", "content": user_text})
        messages = fit_to_budget(self.system_prompt, self.history, self.context_tokens)
        parts: list[str] = []
        try:
            for piece in self.provider.stream(messages, self.model, self.temperature):
                parts.append(piece)
                yield piece
        except ChatError:
            self.history.pop()          # failed turn: forget the question so a retry is clean
            raise
        self.history.append({"role": "assistant", "content": "".join(parts).strip()})

    def clear(self) -> None:
        self.history.clear()
