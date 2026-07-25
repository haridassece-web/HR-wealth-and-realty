import { apiClient } from './apiClient';
import type { ApiResponse } from './apiClient';
import type { User, Role } from '../types';

export interface LoginResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (email: string, role: Role): Promise<ApiResponse<LoginResponse>> => {
    return apiClient.post<LoginResponse>('/auth/login', { email, role });
  },

  register: async (userData: Partial<User>): Promise<ApiResponse<LoginResponse>> => {
    return apiClient.post<LoginResponse>('/auth/register', userData);
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return apiClient.get<User>('/auth/me');
  },

  logout: async (): Promise<ApiResponse<void>> => {
    localStorage.removeItem('hr_wealthy_token');
    return apiClient.post<void>('/auth/logout');
  },
};
