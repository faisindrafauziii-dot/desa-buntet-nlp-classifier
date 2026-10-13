import re
from typing import List


def clean_text(text: str) -> str:
    """Lowercase, remove non-alphanumeric characters, and normalize whitespace."""
    text = text.lower()
    text = re.sub(r"https?://\S+|www\.\S+", " ", text)
    text = re.sub(r"[^a-z0-9\s]+", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def batch_clean(texts: List[str]) -> List[str]:
    return [clean_text(t) for t in texts]
