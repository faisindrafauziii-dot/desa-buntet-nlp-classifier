import apiClient from './api';
import {
  CommunityRequest,
  ApiResponse,
  PaginationResponse,
} from '../types';

class RequestService {
  async submitRequest(
    citizenName: string,
    citizenEmail: string,
    citizenPhone: string,
    requestDescription: string
  ): Promise<CommunityRequest> {
    const response = await apiClient.post<ApiResponse<CommunityRequest>>(
      '/requests',
      {
        citizenName,
        citizenEmail,
        citizenPhone,
        requestDescription,
      }
    );
    return response.data.data!;
  }

  async getRequests(
    page: number = 1,
    limit: number = 20,
    status?: string
  ): Promise<PaginationResponse<CommunityRequest>> {
    const response = await apiClient.get<
      ApiResponse<PaginationResponse<CommunityRequest>>
    >('/requests', {
      params: { page, limit, status },
    });
    return response.data.data!;
  }

  async getRequestById(id: string): Promise<CommunityRequest> {
    const response = await apiClient.get<ApiResponse<CommunityRequest>>(
      `/requests/${id}`
    );
    return response.data.data!;
  }

  async verifyRequest(
    id: string,
    verifiedLabel: string,
    verifiedCategoryId: string,
    verificationNotes?: string
  ): Promise<CommunityRequest> {
    const response = await apiClient.put<ApiResponse<CommunityRequest>>(
      `/requests/${id}/verify`,
      {
        verifiedLabel,
        verifiedCategoryId,
        verificationNotes,
      }
    );
    return response.data.data!;
  }

  async updateRequestStatus(
    id: string,
    status: 'pending' | 'in_process' | 'completed' | 'rejected',
    notes?: string
  ): Promise<CommunityRequest> {
    const response = await apiClient.put<ApiResponse<CommunityRequest>>(
      `/requests/${id}/status`,
      { status, notes }
    );
    return response.data.data!;
  }
}

export default new RequestService();
