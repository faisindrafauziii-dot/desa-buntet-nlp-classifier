from flask import Flask, jsonify, request
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

app = Flask(__name__)

# Contoh dataset awal untuk template proyek.
# Ganti dengan data asli desa Anda saat proyek sudah siap.
train_data = [
    ("air bersih tidak lancar", "pengaduan"),
    ("saya minta bantuan perbaikan jalan", "permohonan"),
    ("terima kasih atas pelayanan posyandu", "saran"),
    ("jadwal vaksinasi desa dibuka", "informasi"),
    ("saluran drainase tersumbat", "pengaduan"),
    ("mohon bantuan pembuatan KTP", "permohonan"),
    ("pelayanan petugas cepat dan ramah", "saran"),
    ("jam operasional kantor hari ini", "informasi"),
]

X_train = [text for text, _ in train_data]
y_train = [label for _, label in train_data]

model = Pipeline([
    ("tfidf", TfidfVectorizer(lowercase=True, stop_words="english")),
    ("clf", MultinomialNB()),
])
model.fit(X_train, y_train)


@app.get("/")
def home():
    return {
        "project": "Desa Buntet NLP Classifier",
        "status": "ready",
        "description": "Template klasifikasi teks berbasis Naive Bayes untuk layanan masyarakat desa.",
        "endpoints": [
            "/classify?text=contoh+teks",
        ],
    }


@app.get("/classify")
def classify():
    text = request.args.get("text", "")
    if not text.strip():
        return jsonify({"error": "Parameter 'text' wajib diisi."}), 400

    prediction = model.predict([text])[0]
    probability = model.predict_proba([text])[0].max()

    return jsonify({
        "text": text,
        "category": prediction,
        "confidence": round(float(probability), 4),
    })


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
