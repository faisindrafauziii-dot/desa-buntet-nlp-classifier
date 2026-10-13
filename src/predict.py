import joblib
from pathlib import Path
from src.train_model import train
from config import MODEL_PATH

_cached = None


def load_model(model_path: str = MODEL_PATH):
    global _cached
    model_file = Path(model_path)
    if not model_file.exists():
        train()
    if _cached is None:
        _cached = joblib.load(model_file)
    return _cached


def predict(text: str):
    model = load_model()
    pred = model.predict([text])[0]
    prob = model.predict_proba([text])[0].max()
    return pred, float(prob)
