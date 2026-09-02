import apiClient from './api';
import {
  ClassificationDataset,
  DatasetRecord,
  DatasetValidation,
  ApiResponse,
  PaginationResponse,
} from '../types';

class DatasetService {
  // Dataset Management
  async getDatasets(): Promise<ClassificationDataset[]> {
    const response = await apiClient.get<ApiResponse<ClassificationDataset[]>>(
      '/datasets'
    );
    return response.data.data || [];
  }

  async getDatasetById(id: string): Promise<ClassificationDataset> {
    const response = await apiClient.get<ApiResponse<ClassificationDataset>>(
      `/datasets/${id}`
    );
    return response.data.data!;
  }

  async createDataset(
    name: string,
    description: string
  ): Promise<ClassificationDataset> {
    const response = await apiClient.post<ApiResponse<ClassificationDataset>>(
      '/datasets',
      { name, description }
    );
    return response.data.data!;
  }

  async uploadDatasetCSV(
    datasetId: string,
    file: File
  ): Promise<{ records: number; duplicates: number }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<
      ApiResponse<{ records: number; duplicates: number }>
    >(`/datasets/${datasetId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data!;
  }

  // Dataset Records
  async getDatasetRecords(
    datasetId: string,
    page: number = 1,
    limit: number = 20,
    label?: string
  ): Promise<PaginationResponse<DatasetRecord>> {
    const response = await apiClient.get<
      ApiResponse<PaginationResponse<DatasetRecord>>
    >(`/datasets/${datasetId}/records`, {
      params: { page, limit, label },
    });
    return response.data.data!;
  }

  async addDatasetRecord(
    datasetId: string,
    text: string,
    label: string
  ): Promise<DatasetRecord> {
    const response = await apiClient.post<ApiResponse<DatasetRecord>>(
      `/datasets/${datasetId}/records`,
      { text, label }
    );
    return response.data.data!;
  }

  async updateDatasetRecord(
    datasetId: string,
    recordId: string,
    text: string,
    label: string
  ): Promise<DatasetRecord> {
    const response = await apiClient.put<ApiResponse<DatasetRecord>>(
      `/datasets/${datasetId}/records/${recordId}`,
      { text, label }
    );
    return response.data.data!;
  }

  async deleteDatasetRecord(
    datasetId: string,
    recordId: string
  ): Promise<void> {
    await apiClient.delete(`/datasets/${datasetId}/records/${recordId}`);
  }

  // Dataset Validation
  async validateDataset(datasetId: string): Promise<DatasetValidation> {
    const response = await apiClient.post<ApiResponse<DatasetValidation>>(
      `/datasets/${datasetId}/validate`
    );
    return response.data.data!;
  }

  // Data Quality
  async findDuplicates(datasetId: string): Promise<DatasetRecord[][]> {
    const response = await apiClient.get<ApiResponse<DatasetRecord[][]>>(
      `/datasets/${datasetId}/duplicates`
    );
    return response.data.data || [];
  }

  async findEmptyRecords(datasetId: string): Promise<DatasetRecord[]> {
    const response = await apiClient.get<ApiResponse<DatasetRecord[]>>(
      `/datasets/${datasetId}/empty-records`
    );
    return response.data.data || [];
  }

  async getCategoryDistribution(
    datasetId: string
  ): Promise<Record<string, number>> {
    const response = await apiClient.get<ApiResponse<Record<string, number>>>(
      `/datasets/${datasetId}/category-distribution`
    );
    return response.data.data || {};
  }
}

export default new DatasetService();
