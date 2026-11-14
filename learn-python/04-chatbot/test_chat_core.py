import pytest

from chat_core import ChatError, ChatSession, EchoProvider, estimate_tokens, fit_to_budget


class ScriptedProvider:
    """Returns a fixed reply and remembers exactly what it was sent."""

    def __init__(self, reply="Hi there!", fail=False):
        self.reply, self.fail, self.seen = reply, fail, []

    def stream(self, messages, model, temperature):
        self.seen.append(messages)
        if self.fail:
            raise ChatError("boom")
        yield from self.reply.split(" ")


def test_send_streams_and_records_history():
    provider = ScriptedProvider("Hello world")
    chat = ChatSession(provider=provider, system_prompt="Be nice.")
    pieces = list(chat.send("hi"))
    assert "".join(pieces) == "Helloworld"
    assert [m["role"] for m in chat.history] == ["user", "assistant"]
    assert provider.seen[0][0] == {"role": "system", "content": "Be nice."}


def test_model_sees_previous_turns():
    provider = ScriptedProvider()
    chat = ChatSession(provider=provider)
    list(chat.send("my name is Aryan"))
    list(chat.send("what is my name?"))
    contents = [m["content"] for m in provider.seen[1]]
    assert "my name is Aryan" in contents     # the API is stateless: we resend history


def test_failed_turn_is_rolled_back():
    chat = ChatSession(provider=ScriptedProvider(fail=True))
    with pytest.raises(ChatError):
        list(chat.send("hello"))
    assert chat.history == []


def test_empty_message_rejected():
    with pytest.raises(ChatError):
        list(ChatSession(provider=ScriptedProvider()).send("   "))


def test_fit_to_budget_drops_oldest_first():
    history = [{"role": "user" if i % 2 == 0 else "assistant", "content": f"m{i} " + "x" * 400}
               for i in range(10)]
    msgs = fit_to_budget("sys", history, max_tokens=350)
    assert msgs[0]["role"] == "system"
    assert msgs[-1] == history[-1]                         # newest always kept
    assert len(msgs) < len(history) + 1                    # something was dropped
    assert msgs[1]["role"] == "user"                       # never starts with an assistant reply
    assert sum(estimate_tokens(m["content"]) for m in msgs) <= 350


def test_fit_to_budget_keeps_newest_even_if_huge():
    history = [{"role": "user", "content": "x" * 100_000}]
    assert fit_to_budget("", history, max_tokens=10) == history


def test_echo_provider_works_offline():
    chat = ChatSession(provider=EchoProvider(delay=0))
    assert "You said: ping" in "".join(chat.send("ping"))
