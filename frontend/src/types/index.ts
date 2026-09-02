// Common Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Dataset Types
export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface DatasetRecord {
  id: string;
  datasetId: string;
  text: string;
  label: string;
  isDuplicate: boolean;
  createdAt: string;
}

export interface ClassificationDataset {
  id: string;
  name: string;
  description?: string;
  version: string;
  status: 'draft' | 'ready' | 'archived';
  totalRecords: number;
  totalCategories: number;
  createdAt: string;
  updatedAt: string;
}

export interface DatasetValidation {
  isValid: boolean;
  hasTextColumn: boolean;
  hasLabelColumn: boolean;
  emptyTexts: number;
  emptyLabels: number;
  duplicates: number;
  categoryDistribution: Record<string, number>;
  minCategorySize: number;
  issues: string[];
}

// Preprocessing Types
export interface PreprocessingResult {
  datasetRecordId: string;
  originalText: string;
  afterCaseFolding: string;
  afterCleaning: string;
  afterTokenization: string[];
  afterStopwordRemoval: string[];
  afterStemming: string[];
}

// TF-IDF Types
export interface TFIDFResult {
  vocabulary: string[];
  vocabularySize: number;
  vectors: TFIDFVector[];
  totalDocuments: number;
}

export interface TFIDFVector {
  documentId: string;
  term: string;
  tfidfValue: number;
}

// Model Training Types
export interface ModelConfig {
  algorithm: string;
  preprocessingConfig: Record<string, any>;
  tfidfConfig: Record<string, any>;
  trainTestRatio: '70:30' | '80:20' | '90:10';
  randomSeed: number;
}

export interface ModelVersion {
  id: string;
  versionNumber: number;
  datasetId: string;
  status: 'training' | 'completed' | 'error';
  totalRecords: number;
  trainingRecords: number;
  testingRecords: number;
  accuracy: number;
  macroPrecision: number;
  macroRecall: number;
  macroF1Score: number;
  weightedF1Score: number;
  perCategoryMetrics: CategoryMetric[];
  confusionMatrix: number[][];
  categories: string[];
  isActive: boolean;
  trainingStartedAt: string;
  trainingCompletedAt: string;
  trainingDurationSeconds: number;
  createdAt: string;
}

export interface CategoryMetric {
  categoryName: string;
  precision: number;
  recall: number;
  f1Score: number;
  support: number;
}

// Prediction Types
export interface PredictionRequest {
  text: string;
}

export interface PredictionResult {
  inputText: string;
  preprocessedText: string[];
  predictedLabel: string;
  predictedCategoryId: string;
  confidence: number;
  probabilities: CategoryProbability[];
  modelVersionId: string;
}

export interface CategoryProbability {
  category: string;
  probability: number;
  percentage: string;
}

// Community Request Types
export interface CommunityRequest {
  id: string;
  requestNumber: string;
  citizenName: string;
  citizenEmail: string;
  citizenPhone: string;
  requestDescription: string;
  predictedLabel: string;
  predictedCategoryId: string;
  predictionConfidence: number;
  verifiedLabel?: string;
  verifiedCategoryId?: string;
  isVerified: boolean;
  predictionMatchesVerification?: boolean;
  status: 'pending' | 'in_process' | 'completed' | 'rejected';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  submittedAt: string;
  completedAt?: string;
}
