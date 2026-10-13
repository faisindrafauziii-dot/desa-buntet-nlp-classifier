from flask import Flask, jsonify, request, render_template
from src.predict import predict

app = Flask(__name__)

@app.get("/")
def index():
    return render_template("index.html")

@app.get("/health")
def health():
    return jsonify({"status": "ok", "project": "desa-buntet-nlp-classifier"})

@app.get("/classify")
def classify():
    text = request.args.get("text", "")
    if not text.strip():
        return jsonify({"error": "Parameter 'text' wajib diisi."}), 400

    category, confidence = predict(text)
    return jsonify({
        "text": text,
        "category": category,
        "confidence": round(confidence, 4),
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
