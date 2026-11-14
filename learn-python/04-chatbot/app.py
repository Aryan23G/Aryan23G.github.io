"""Streamlit chat UI.

    pip install streamlit openai
    streamlit run app.py

Key: set OPENAI_API_KEY in your environment, put it in .streamlit/secrets.toml,
or paste it in the sidebar. With no key the app runs in offline echo mode.
"""

import os

import streamlit as st

from chat_core import ChatError, ChatSession, EchoProvider, OpenAIProvider

st.set_page_config(page_title="Chatbot", page_icon="💬")


def default_key() -> str:
    try:
        return st.secrets.get("OPENAI_API_KEY", "") or os.environ.get("OPENAI_API_KEY", "")
    except FileNotFoundError:            # no secrets.toml: that's fine
        return os.environ.get("OPENAI_API_KEY", "")


# Streamlit re-runs this whole file on every click and keystroke.
# st.session_state is the one place that survives between runs.
if "chat" not in st.session_state:
    st.session_state.chat = ChatSession(provider=EchoProvider())
chat: ChatSession = st.session_state.chat

with st.sidebar:
    st.header("Settings")
    api_key = st.text_input("API key", value=default_key(), type="password",
                            help="Never stored on disk. Leave empty for offline echo mode.")
    base_url = st.text_input("Base URL (optional)", placeholder="https://api.openai.com/v1",
                             help="For Ollama use http://localhost:11434/v1 with any key.")
    chat.model = st.text_input("Model", value=chat.model)
    chat.temperature = st.slider("Temperature", 0.0, 1.5, chat.temperature, 0.1,
                                 help="Lower is more focused and repeatable; higher is more varied.")
    chat.system_prompt = st.text_area("System prompt", value=chat.system_prompt, height=100)
    if st.button("Clear conversation"):
        chat.clear()
        st.rerun()

# Rebuild the provider only when the connection settings change.
settings = (api_key, base_url)
if st.session_state.get("provider_settings") != settings:
    try:
        chat.provider = OpenAIProvider(api_key, base_url) if api_key else EchoProvider()
    except ImportError:
        st.sidebar.error("Run `pip install openai` to use a real model.")
        chat.provider = EchoProvider()
    st.session_state.provider_settings = settings

st.title("💬 Chatbot")
if isinstance(chat.provider, EchoProvider):
    st.info("Offline echo mode. Add an API key in the sidebar to use a real model.")

for msg in chat.history:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

if prompt := st.chat_input("Message"):
    with st.chat_message("user"):
        st.markdown(prompt)
    with st.chat_message("assistant"):
        try:
            st.write_stream(chat.send(prompt))
        except ChatError as err:
            st.error(str(err))
