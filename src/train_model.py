import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib
from config import MODEL_PATH, TRAIN_DATA_PATH
from src.preprocessing import batch_clean


def train(data_path: str = TRAIN_DATA_PATH, model_path: str = MODEL_PATH) -> Pipeline:
    df = pd.read_csv(data_path)
    if "text" not in df.columns or "label" not in df.columns:
        raise ValueError("CSV harus memiliki kolom 'text' dan 'label'")

    X = batch_clean(df["text"].astype(str).tolist())
    y = df["label"].astype(str).tolist()

    pipeline = Pipeline([
        ("tfidf", TfidfVectorizer()),
        ("clf", MultinomialNB()),
    ])

    pipeline.fit(X, y)
    joblib.dump(pipeline, model_path)
    print(f"Model tersimpan di: {model_path}")
    return pipeline


if __name__ == "__main__":
    train()
