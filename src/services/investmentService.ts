import { apiClient } from './apiClient';
import type { ApiResponse } from './apiClient';
import type { InvestmentPlan } from '../types';

export const investmentService = {
  getAllPlans: async (): Promise<ApiResponse<InvestmentPlan[]>> => {
    return apiClient.get<InvestmentPlan[]>('/investment-plans');
  },

  createPlan: async (plan: Omit<InvestmentPlan, 'id' | 'createdAt'>): Promise<ApiResponse<InvestmentPlan>> => {
    return apiClient.post<InvestmentPlan>('/investment-plans', plan);
  },

  deletePlan: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/investment-plans/${id}`);
  },
};
