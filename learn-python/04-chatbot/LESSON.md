# Lesson 4 — Chatbot UI: state, streaming, and depending on an AI model

**Setup:** `pip install -r requirements.txt`  **Run:** `streamlit run app.py`  **Test:** `python -m pytest`

With no API key it runs in **offline echo mode**, so you can build and test the UI for free. To use a real model, set `OPENAI_API_KEY`, or paste a key in the sidebar. For a free local model, install [Ollama](https://ollama.com), run `ollama pull llama3.2`, then set the base URL to `http://localhost:11434/v1`, the model to `llama3.2`, and the key to any text.

## What you built

A ChatGPT-style app: message history, replies that stream in word by word, a settings sidebar (model, temperature, system prompt), and clear error messages when the API fails.

## Fundamental 1: the model has no memory. You send it the history.

This surprises almost everyone. Each API call is **stateless**: the model doesn't remember your last message. "Memory" is just you resending the whole conversation each time:

```python
[{"role": "system",    "content": "You are a helpful assistant."},
 {"role": "user",      "content": "my name is Aryan"},
 {"role": "assistant", "content": "Nice to meet you, Aryan!"},
 {"role": "user",      "content": "what is my name?"}]      # <- new message
```

`test_model_sees_previous_turns` checks this. Two consequences follow from it:

1. **Every message costs more than the one before**, because you pay for all the history again.
2. **Eventually it doesn't fit.** Models have a fixed context window. `fit_to_budget()` keeps the system prompt plus the newest messages that fit, and drops the oldest first. It also never starts the history with an assistant reply that has lost its question.

(`estimate_tokens` uses "about 4 characters per token". The real count comes from a tokenizer such as `tiktoken`. For budgeting, a cheap estimate that's roughly right beats an exact one you never compute.)

## Fundamental 2: Streamlit re-runs your whole script

Every click or keystroke runs `app.py` again, top to bottom. A normal variable like `history = []` would reset on every run. **`st.session_state`** is the only thing that survives between runs, which is why the `ChatSession` lives there.

This "re-run everything and redraw" model is how React and other modern UI frameworks work too. You describe what the screen *should* look like given the state, and the framework works out what changed. It's easier to reason about than changing the screen piece by piece.

Note the side effect: `OpenAIProvider` is only rebuilt when the key or URL *changes* (`provider_settings`). Doing expensive work on every run is the classic Streamlit performance mistake. Look up `@st.cache_resource` for the built-in way to avoid it.

## Fundamental 3: program to an interface, not a vendor

```python
class Provider(Protocol):
    def stream(self, messages, model, temperature) -> Iterator[str]: ...
```

`ChatSession` only knows it has *something* with a `stream` method. That buys you three things:

- **`EchoProvider`** lets you build the UI with no key, no network, and no bill.
- **`ScriptedProvider`** in the tests returns fixed replies, can fail on demand, and records what it was sent.
- **Switching vendors** means setting `base_url`. Many providers (OpenAI, Groq, Together, Ollama, LM Studio) accept the same OpenAI-style API.

That's dependency injection again (Lesson 2), now with a `Protocol` to describe the contract. AI APIs change constantly. Keep the vendor in one small class, and the rest of your app won't care.

## Fundamental 4: generators and streaming

`provider.stream()` uses `yield`, so it's a **generator**: it hands back each piece as it arrives instead of building the whole reply first. `st.write_stream()` shows each piece right away. The full reply might take 10 seconds, but the user sees the first words in under one, and that's the difference between an app that feels fast and one that feels broken.

`ChatSession.send` is a generator too. It passes each piece through and also collects them, so it can save the full reply to history when the stream finishes. Only after a *complete* reply does it save. If the stream fails, the user's message is removed again (`history.pop()`), so retrying doesn't create a duplicate. That's a small **transaction**: either the whole turn is saved or none of it is.

## Fundamental 5: errors people can act on

`openai.AuthenticationError` becomes "The API key was rejected." `RateLimitError` becomes "Rate limit or quota reached." Users get something they can fix, not a stack trace. This is the same boundary-translation rule as in Lessons 1 and 2, now applied to a third-party library.

## Using AI responsibly in apps

- **Secrets:** the key comes from the environment, `.streamlit/secrets.toml` (which is in `.gitignore`), or the password field, never from the code.
- **Cost:** set a spending limit in your provider's dashboard *before* you deploy anything public. A public chatbot with your key is a public credit card.
- **Output is untrusted text.** Never pass a model's reply to `eval`, a shell, or SQL. It can be wrong, and a user can talk it into producing anything.

## Exercises

1. Add a "Regenerate" button that removes the last assistant reply and sends the conversation again.
2. Show approximate tokens used and estimated cost per conversation in the sidebar.
3. Save conversations to SQLite (reuse Lesson 3) and list past chats in the sidebar.
4. Replace `estimate_tokens` with `tiktoken` and write a test comparing the two on a few sentences. How far off is the estimate?
