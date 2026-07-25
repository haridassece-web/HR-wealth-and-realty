import { apiClient } from './apiClient';
import type { ApiResponse } from './apiClient';
import type { Policy, CommissionRecord } from '../types';

export const policyService = {
  getAll: async (): Promise<ApiResponse<Policy[]>> => {
    return apiClient.get<Policy[]>('/policies');
  },

  getById: async (id: string): Promise<ApiResponse<Policy>> => {
    return apiClient.get<Policy>(`/policies/${id}`);
  },

  create: async (policy: Omit<Policy, 'id'>): Promise<ApiResponse<{ policy: Policy; commission: CommissionRecord }>> => {
    return apiClient.post<{ policy: Policy; commission: CommissionRecord }>('/policies', policy);
  },

  update: async (id: string, policy: Partial<Policy>): Promise<ApiResponse<Policy>> => {
    return apiClient.put<Policy>(`/policies/${id}`, policy);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/policies/${id}`);
  },

  getCommissions: async (): Promise<ApiResponse<CommissionRecord[]>> => {
    return apiClient.get<CommissionRecord[]>('/commissions');
  },
};
