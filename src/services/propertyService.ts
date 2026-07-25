import { apiClient } from './apiClient';
import type { ApiResponse } from './apiClient';
import type { Property } from '../types';

export const propertyService = {
  getAll: async (): Promise<ApiResponse<Property[]>> => {
    return apiClient.get<Property[]>('/properties');
  },

  getById: async (id: string): Promise<ApiResponse<Property>> => {
    return apiClient.get<Property>(`/properties/${id}`);
  },

  create: async (property: Omit<Property, 'id'>): Promise<ApiResponse<Property>> => {
    return apiClient.post<Property>('/properties', property);
  },

  update: async (id: string, property: Partial<Property>): Promise<ApiResponse<Property>> => {
    return apiClient.put<Property>(`/properties/${id}`, property);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/properties/${id}`);
  },
};
