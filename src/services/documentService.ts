import { apiClient } from './apiClient';
import type { ApiResponse } from './apiClient';
import type { SystemDocument } from '../types';

export const documentService = {
  getAll: async (): Promise<ApiResponse<SystemDocument[]>> => {
    return apiClient.get<SystemDocument[]>('/documents');
  },

  upload: async (file: File, category: SystemDocument['category'], associatedEntityName: string): Promise<ApiResponse<SystemDocument>> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('associatedEntityName', associatedEntityName);
    return apiClient.post<SystemDocument>('/documents/upload', formData);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/documents/${id}`);
  },
};
