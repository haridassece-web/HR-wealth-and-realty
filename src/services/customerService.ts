import { apiClient } from './apiClient';
import type { ApiResponse } from './apiClient';
import type { Customer } from '../types';

export const customerService = {
  getAll: async (): Promise<ApiResponse<Customer[]>> => {
    return apiClient.get<Customer[]>('/customers');
  },

  getById: async (id: string): Promise<ApiResponse<Customer>> => {
    return apiClient.get<Customer>(`/customers/${id}`);
  },

  create: async (customer: Omit<Customer, 'id' | 'createdAt'>): Promise<ApiResponse<Customer>> => {
    return apiClient.post<Customer>('/customers', customer);
  },

  update: async (id: string, customer: Partial<Customer>): Promise<ApiResponse<Customer>> => {
    return apiClient.put<Customer>(`/customers/${id}`, customer);
  },

  softDelete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.patch<void>(`/customers/${id}/soft-delete`);
  },

  restore: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.patch<void>(`/customers/${id}/restore`);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/customers/${id}`);
  },
};
