# Sistem Informasi Pelayanan Masyarakat Desa Buntet
## Berbasis Klasifikasi Teks dengan Algoritma Naive Bayes

### Tujuan Penelitian
Aplikasi web ini dibangun untuk penelitian skripsi yang mengimplementasikan klasifikasi teks menggunakan Multinomial Naive Bayes dengan TF-IDF feature extraction untuk mengotomatisasi kategorisasi pengajuan pelayanan masyarakat di Desa Buntet.

### Fitur Utama

#### Stage 1: Aplikasi Dasar ✅
- Dashboard admin
- Form pengajuan masyarakat
- Manajemen kategori pelayanan
- Dashboard statistik

#### Stage 2: Machine Learning Classification 🚀 (Current)
- **Dataset Management**: Upload, CRUD, validasi dataset
- **Text Preprocessing**: Case folding, cleaning, tokenization, stopword removal, stemming
- **Feature Extraction**: TF-IDF vectorization
- **Model Training**: Multinomial Naive Bayes
- **Model Evaluation**: Accuracy, Precision, Recall, F1-Score, Confusion Matrix
- **Auto-Classification**: Klasifikasi otomatis pada form pengajuan
- **Model History**: Riwayat training dan versioning
- **Prediction Testing**: Interface untuk testing klasifikasi

### Tech Stack

**Frontend:**
- React.js with TypeScript
- Tailwind CSS for styling
- Recharts for visualizations
- Axios for API calls

**Backend:**
- Node.js + Express.js (Web API)
- Python + FastAPI (ML Service)
- PostgreSQL (Database)
- Redis (Caching)

**ML Libraries:**
- scikit-learn (Naive Bayes, TF-IDF, metrics)
- Sastrawi (Indonesian stemming)
- NLTK (NLP utilities)
- Pandas + NumPy (Data processing)

### Project Structure

```
desa-buntet-nlp-classifier/
├── frontend/                 # React.js application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
├── backend/                  # Node.js API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── app.ts
│   ├── package.json
│   └── tsconfig.json
├── ml-service/              # Python ML Service
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   │   ├── preprocessing.py
│   │   │   ├── tfidf_service.py
│   │   │   ├── naive_bayes.py
│   │   │   └── evaluation.py
│   │   ├── schemas/
│   │   └── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── database/
│   └── schema.sql
├── docker-compose.yml
└── README.md
```

### Instalasi & Setup

Lihat dokumentasi lengkap di masing-masing direktori:
- [Frontend Setup](./frontend/README.md)
- [Backend Setup](./backend/README.md)
- [ML Service Setup](./ml-service/README.md)

### Database Schema

Lihat [database/schema.sql](./database/schema.sql) untuk struktur database.

### API Documentation

API documentation tersedia di `http://localhost:3000/api/docs` (Swagger UI)

### Reproducibility & Research Requirements

Sistem dirancang dengan mempertimbangkan kebutuhan penelitian:
- Semua konfigurasi tersimpan (random seed, train/test ratio, preprocessing config)
- Dataset versioning untuk tracking perubahan
- Detailed training history dan model metadata
- Transparent processing dari raw text hingga prediksi
- Evaluation metrics untuk research documentation

### Keamanan Data

- Informasi pribadi masyarakat tidak disimpan di dataset penelitian
- Anonimisasi data sebelum digunakan untuk training
- Access control untuk admin features
- API authentication untuk ML service

### Kontribusi

Untuk pengembangan lebih lanjut, buat branch baru:
```bash
git checkout -b feature/nama-fitur
```

### Lisensi

MIT License - Untuk keperluan penelitian akademik

### Kontak

Untuk pertanyaan atau issues, buat issue baru di repository ini.
