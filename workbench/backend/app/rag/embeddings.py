"""Embedding backends for schema RAG.

* `FastEmbedEmbedder` (production): ONNX `BAAI/bge-small-en-v1.5` via fastembed,
  384-d, CPU-only, no external API.
* `HashingEmbedder` (offline/tests/CI): deterministic feature hashing of word
  unigrams, bigrams and character trigrams. No model download, identical
  vectors on every machine, still good enough to rank schema tables.
"""

from __future__ import annotations

import hashlib
import logging
import math
import re
from collections.abc import Sequence
from itertools import pairwise
from typing import Protocol

_WORD = re.compile(r"[a-z0-9]+")
_STOP = frozenset({
    "a", "an", "the", "of", "for", "to", "in", "on", "by", "at", "with", "and", "or", "is", "are", "was", "were",
    "be", "has", "have", "had", "do", "does", "did", "which", "what", "who", "whom", "how", "many", "much", "per",
    "each", "all", "any", "our", "we", "my", "me", "i", "it", "its", "this", "that", "these", "those", "from", "as",
    "than", "then", "show", "list", "give", "find", "get", "tell", "table", "column", "columns", "values", "value",
    "rows", "row",
})
# Light morphology so "returned"/"returns", "shipping"/"shipments" meet.
_SUFFIXES = ("ments", "ment", "ings", "ing", "ies", "ed", "es", "s")


log = logging.getLogger(__name__)


class Embedder(Protocol):
    @property
    def name(self) -> str: ...

    @property
    def dim(self) -> int: ...

    def embed(self, texts: Sequence[str]) -> list[list[float]]: ...

    def embed_query(self, text: str) -> list[float]: ...


def _stem(word: str) -> str:
    for suf in _SUFFIXES:
        if word.endswith(suf) and len(word) - len(suf) >= 3:
            return word[: -len(suf)]
    return word


class HashingEmbedder:
    """Feature hashing with IDF weights fitted on the schema corpus (see `fit`)."""

    def __init__(self, dim: int = 1024) -> None:
        self._dim = dim
        self._idf: dict[str, float] = {}
        self._default_idf = 1.0

    def fit(self, corpus: Sequence[str]) -> None:
        """Learn IDF weights from the indexed documents so rare, discriminative terms dominate."""
        n = len(corpus)
        df: dict[str, int] = {}
        for text in corpus:
            for feat in set(self._features(text)):
                df[feat] = df.get(feat, 0) + 1
        self._idf = {f: math.log((1 + n) / (1 + c)) + 1.0 for f, c in df.items()}
        self._default_idf = math.log(1 + n) + 1.0

    @property
    def name(self) -> str:
        return f"hashing-idf-{self._dim}"

    @property
    def dim(self) -> int:
        return self._dim

    def _features(self, text: str) -> list[str]:
        words = [_stem(w) for w in _WORD.findall(text.lower().replace("_", " ")) if w not in _STOP]
        feats = [f"w:{w}" for w in words]
        feats += [f"b:{a}_{b}" for a, b in pairwise(words)]
        for w in words:
            padded = f"#{w}#"
            feats += [f"c:{padded[i:i + 3]}" for i in range(len(padded) - 2)]
        return feats

    def _vector(self, text: str) -> list[float]:
        vec = [0.0] * self._dim
        for feat in self._features(text):
            digest = hashlib.blake2b(feat.encode(), digest_size=8).digest()
            idx = int.from_bytes(digest[:4], "little") % self._dim
            sign = 1.0 if digest[4] & 1 else -1.0
            weight = (0.3 if feat.startswith("c:") else 1.0) * self._idf.get(feat, self._default_idf)
            vec[idx] += sign * weight
        norm = math.sqrt(sum(v * v for v in vec)) or 1.0
        return [v / norm for v in vec]

    def embed(self, texts: Sequence[str]) -> list[list[float]]:
        return [self._vector(t) for t in texts]

    def embed_query(self, text: str) -> list[float]:
        return self._vector(text)


class FastEmbedEmbedder:
    def __init__(self, model_name: str = "BAAI/bge-small-en-v1.5") -> None:
        from fastembed import TextEmbedding  # imported lazily: optional dependency

        self._model = TextEmbedding(model_name=model_name)
        self._model_name = model_name
        self._dim = len(next(iter(self._model.embed(["probe"]))))

    @property
    def name(self) -> str:
        return f"fastembed:{self._model_name}"

    @property
    def dim(self) -> int:
        return self._dim

    def embed(self, texts: Sequence[str]) -> list[list[float]]:
        return [v.tolist() for v in self._model.embed(list(texts))]

    def embed_query(self, text: str) -> list[float]:
        # bge models expect an instruction prefix on queries (asymmetric retrieval).
        return [float(x) for x in next(iter(self._model.query_embed([text])))]


def build_embedder(kind: str, model_name: str) -> Embedder:
    """Production default is fastembed. If the model cannot be loaded (no network on first start, package not
    installed) the service still starts on the offline hashing embedder, loudly, and reports it via /api/health."""
    if kind == "hashing":
        return HashingEmbedder()
    try:
        return FastEmbedEmbedder(model_name)
    except Exception as exc:  # ImportError, download/ONNX failures
        log.warning("fastembed model %s unavailable (%s); falling back to HashingEmbedder", model_name, exc)
        return HashingEmbedder()
