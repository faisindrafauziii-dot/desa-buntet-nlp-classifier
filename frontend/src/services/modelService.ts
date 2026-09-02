import apiClient from './api';
import {
  ModelVersion,
  PreprocessingResult,
  TFIDFResult,
  ApiResponse,
} from '../types';

class ModelService {
  // Model Training
  async trainModel(
    datasetId: string,
    trainTestRatio: '70:30' | '80:20' | '90:10' = '80:20',
    randomSeed: number = 42
  ): Promise<ModelVersion> {
    const response = await apiClient.post<ApiResponse<ModelVersion>>(
      '/models/train',
      {
        datasetId,
        trainTestRatio,
        randomSeed,
      }
    );
    return response.data.data!;
  }

  // Model History
  async getModelVersions(datasetId?: string): Promise<ModelVersion[]> {
    const response = await apiClient.get<ApiResponse<ModelVersion[]>>(
      '/models/versions',
      { params: { datasetId } }
    );
    return response.data.data || [];
  }

  async getModelVersion(versionId: string): Promise<ModelVersion> {
    const response = await apiClient.get<ApiResponse<ModelVersion>>(
      `/models/versions/${versionId}`
    );
    return response.data.data!;
  }

  async getActiveModel(): Promise<ModelVersion> {
    const response = await apiClient.get<ApiResponse<ModelVersion>>(
      '/models/active'
    );
    return response.data.data!;
  }

  async setActiveModel(versionId: string): Promise<ModelVersion> {
    const response = await apiClient.post<ApiResponse<ModelVersion>>(
      `/models/versions/${versionId}/activate`
    );
    return response.data.data!;
  }

  // Preprocessing
  async getPreprocessingResult(
    datasetRecordId: string,
    modelVersionId?: string
  ): Promise<PreprocessingResult> {
    const response = await apiClient.get<ApiResponse<PreprocessingResult>>(
      `/preprocessing/${datasetRecordId}`,
      { params: { modelVersionId } }
    );
    return response.data.data!;
  }

  // TF-IDF
  async getTFIDFResults(
    modelVersionId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<TFIDFResult> {
    const response = await apiClient.get<ApiResponse<TFIDFResult>>(
      `/tfidf/${modelVersionId}`,
      { params: { page, limit } }
    );
    return response.data.data!;
  }

  async getVocabulary(modelVersionId: string): Promise<string[]> {
    const response = await apiClient.get<ApiResponse<string[]>>(
      `/tfidf/${modelVersionId}/vocabulary`
    );
    return response.data.data || [];
  }

  // Training Progress
  async getTrainingProgress(modelVersionId: string): Promise<{
    status: string;
    progress: number;
    message: string;
  }> {
    const response = await apiClient.get<
      ApiResponse<{ status: string; progress: number; message: string }>
    >(`/models/versions/${modelVersionId}/progress`);
    return response.data.data!;
  }
}

export default new ModelService();
