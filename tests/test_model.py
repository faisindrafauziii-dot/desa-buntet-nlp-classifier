from src import train_model


def test_train_creates_pipeline(tmp_path):
    fp = tmp_path / "train_data.csv"
    fp.write_text("text,label\nhello world,greet\nfoo bar,other\n")
    model_path = tmp_path / "model.pkl"

    pipeline = train_model.train(data_path=str(fp), model_path=str(model_path))
    assert hasattr(pipeline, 'predict')
    assert pipeline.predict(["hello world"]).size > 0
