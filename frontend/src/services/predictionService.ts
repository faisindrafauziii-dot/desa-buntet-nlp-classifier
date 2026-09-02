import apiClient from './api';
import { PredictionRequest, PredictionResult, ApiResponse } from '../types';

class PredictionService {
  async predictText(text: string): Promise<PredictionResult> {
    const response = await apiClient.post<ApiResponse<PredictionResult>>(
      '/predictions/predict',
      { text } as PredictionRequest
    );
    return response.data.data!;
  }

  async getPredictionHistory(
    page: number = 1,
    limit: number = 20
  ): Promise<{ data: PredictionResult[]; total: number }> {
    const response = await apiClient.get<
      ApiResponse<{ data: PredictionResult[]; total: number }>
    >('/predictions/history', {
      params: { page, limit },
    });
    return response.data.data!;
  }
}

export default new PredictionService();
