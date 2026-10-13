import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
import joblib

from config import MODEL_PATH, TRAIN_DATA_PATH
from src.preprocessing import batch_clean


def train(data_path: str = TRAIN_DATA_PATH, model_path: str = MODEL_PATH):
    df = pd.read_csv(data_path)
    if "text" not in df.columns or "label" not in df.columns:
        raise ValueError("CSV harus memiliki kolom 'text' dan 'label'")

    X = batch_clean(df["text"].astype(str).tolist())
    y = df["label"].astype(str).tolist()

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    pipeline = Pipeline([
        ("tfidf", TfidfVectorizer()),
        ("clf", MultinomialNB()),
    ])

    pipeline.fit(X_train, y_train)
    y_pred = pipeline.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred, output_dict=True)

    save_path = Path(model_path)
    save_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(pipeline, save_path)

    print(f"Model berhasil dibuat dan disimpan di {save_path}")
    print(f"Akurasi: {acc:.4f}")
    print(classification_report(y_test, y_pred))
    return {"model": pipeline, "accuracy": acc, "report": report}


if __name__ == "__main__":
    train()
