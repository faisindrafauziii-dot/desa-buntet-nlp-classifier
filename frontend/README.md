# Frontend - Desa Buntet NLP Classification System

## Setup Instructions

### Prerequisites
- Node.js 16+ dan npm/yarn
- React 18+
- TypeScript

### Installation

```bash
cd frontend
npm install
```

### Environment Configuration

Buat file `.env.local`:

```
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ML_API_URL=http://localhost:8000
```

### Development Server

```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

### Build Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Admin/
│   │   ├── Dashboard.tsx
│   │   ├── DatasetManagement.tsx
│   │   ├── PreprocessingViewer.tsx
│   │   ├── TFIDFViewer.tsx
│   │   ├── ModelTraining.tsx
│   │   ├── EvaluationDashboard.tsx
│   │   ├── ConfusionMatrixDisplay.tsx
│   │   ├── PredictionTester.tsx
│   │   └── ModelHistory.tsx
│   ├── Public/
│   │   ├── RequestForm.tsx
│   │   ├── RequestStatus.tsx
│   │   └── Classification Display.tsx
│   ├── Shared/
│   │   ├── Navigation.tsx
│   │   ├── Layout.tsx
│   │   └── LoadingSpinner.tsx
├── pages/
│   ├── AdminDashboard.tsx
│   ├── DatasetPage.tsx
│   ├── PreprocessingPage.tsx
│   ├── TFIDFPage.tsx
│   ├── ModelTrainingPage.tsx
│   ├── EvaluationPage.tsx
│   ├── PredictionPage.tsx
│   ├── RequestPage.tsx
│   └── NotFoundPage.tsx
├── services/
│   ├── api.ts
│   ├── datasetService.ts
│   ├── modelService.ts
│   ├── predictionService.ts
│   └── requestService.ts
├── types/
│   ├── dataset.ts
│   ├── model.ts
│   ├── prediction.ts
│   └── common.ts
├── hooks/
│   ├── useApi.ts
│   ├── useAuth.ts
│   └── useDataset.ts
├── styles/
│   ├── index.css
│   ├── tailwind.css
│   └── themes.css
└── App.tsx
```

## Key Pages & Components

### Admin Panel

#### 1. Dataset Management (`/admin/dataset`)
- Upload CSV dataset
- View semua data dalam tabel
- Add/Edit/Delete data manual
- Search dan filter by label
- Data quality checks (duplicates, empty fields)
- Dataset statistics

#### 2. Preprocessing Viewer (`/admin/preprocessing`)
- Select data untuk di-preview
- Lihat setiap tahap preprocessing
- Tabel hasil preprocessing

#### 3. TF-IDF Display (`/admin/tfidf`)
- Vocabulary list
- TF-IDF matrix dengan pagination
- Term-document visualization

#### 4. Model Training (`/admin/model/training`)
- Dataset info
- Train/test split ratio selector (70:30, 80:20, 90:10)
- Training button
- Progress indicator
- Training configuration display

#### 5. Evaluation Dashboard (`/admin/model/evaluation`)
- Accuracy, Precision, Recall, F1-Score
- Per-category metrics table
- Confusion Matrix heatmap
- Performance graphs

#### 6. Prediction Tester (`/admin/predict`)
- Text input area
- Preprocessing result display
- Prediction result
- Confidence/probability table

#### 7. Model History (`/admin/model/history`)
- Training history table
- Model versioning
- Switch active model
- View detailed metrics per version

### Public Interface

#### Request Form (`/request`)
- Form input untuk deskripsi keperluan
- Auto-classification display
- Confidence score display
- Submit button

## UI/UX Components

- **Charts**: Recharts untuk visualisasi metrics, confusion matrix, distribution
- **Tables**: Pagination, sorting, filtering
- **Forms**: Validation, error handling, success messages
- **Status Indicators**: Loading, error, success states

## Styling

- Tailwind CSS untuk utility-first styling
- Responsive design untuk mobile/tablet/desktop
- Dark mode support
- Consistent color scheme untuk research-focused design

## API Integration

Semua API calls melalui `services/api.ts` dengan error handling dan token management.

## Build & Deploy

Untuk production deployment, lihat dokumentasi backend.
