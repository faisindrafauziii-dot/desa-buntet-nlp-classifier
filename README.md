# Desa Buntet NLP Classifier

Sistem Informasi Pelayanan Masyarakat Desa Buntet dengan klasifikasi teks berbasis Naive Bayes untuk mendukung pengelolaan layanan masyarakat secara lebih terstruktur.

## Deskripsi

Proyek ini dirancang untuk mengklasifikasikan teks pengaduan, permohonan, saran, dan informasi masyarakat desa ke dalam kategori tertentu menggunakan metode Naive Bayes. Tujuan utamanya adalah untuk membantu pengelolaan pelayanan masyarakat di Desa Buntet agar lebih cepat, terorganisir, dan mudah dipantau.

## Fitur utama

- Klasifikasi teks otomatis dari input masyarakat
- Kategori data: pengaduan, permohonan, informasi, saran
- Hasil prediksi dengan tingkat kepercayaan
- Antarmuka web sederhana berbasis Flask
- Dapat dikembangkan menjadi sistem layanan masyarakat yang lebih lengkap

## Teknologi yang digunakan

- Python 3
- Flask
- scikit-learn
- pandas
- numpy
- joblib

## Struktur proyek

```text
desa-buntet-nlp-classifier/
├── README.md
├── requirements.txt
├── app.py
├── config.py
├── .gitignore
├── data/
│   └── train_data.csv
├── model/
│   └── README.md
├── src/
│   ├── __init__.py
│   ├── preprocessing.py
│   ├── train_model.py
│   └── predict.py
├── static/
│   └── css/
│       └── style.css
├── templates/
│   └── index.html
├── tests/
│   └── test_model.py
└── .venv/
```

## Persyaratan sistem

- Python 3.10+
- pip
- virtual environment (direkomendasikan)

## Instalasi

1. Clone repositori

```bash
git clone https://github.com/faisindrafauziii-dot/desa-buntet-nlp-classifier.git
cd desa-buntet-nlp-classifier
```

2. Buat environment virtual

```bash
python -m venv .venv
source .venv/bin/activate
# Windows:
# .venv\Scripts\activate
```

3. Install dependensi

```bash
pip install -r requirements.txt
```

## Menjalankan aplikasi

```bash
python app.py
```

Aplikasi akan berjalan di:

- http://localhost:5000/

## Contoh penggunaan

Gunakan endpoint berikut untuk memprediksi kategori teks:

```bash
http://localhost:5000/classify?text=saya+minta+bantuan+perbaikan+jalan
```

Contoh hasil:

```json
{
  "text": "saya minta bantuan perbaikan jalan",
  "category": "permohonan",
  "confidence": 0.92
}
```

## Dataset

Dataset contoh ada di folder `data/train_data.csv` dan masih dapat dikembangkan sesuai data asli desa.

## Langkah pengembangan selanjutnya

- [ ] Menambah dataset nyata dari masyarakat desa
- [ ] Melakukan evaluasi model dengan data uji
- [ ] Menambahkan fitur dashboard admin
- [ ] Menyimpan hasil klasifikasi ke database
- [ ] Mengintegrasikan dengan sistem informasi desa

## Kontribusi

Anda dapat menambah data, memperbaiki preprocessing, atau menyesuaikan kategori sesuai kebutuhan lapangan.

## Catatan

Project ini masih dalam tahap starter/demo. Untuk proyek final yang lebih siap dipakai, diperlukan dataset asli, validasi model, dan integrasi dengan backend/database yang lebih lengkap.
