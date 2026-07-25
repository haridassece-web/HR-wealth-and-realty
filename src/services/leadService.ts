import { apiClient } from './apiClient';
import type { ApiResponse } from './apiClient';
import type { Lead, FollowUp } from '../types';

export const leadService = {
  getAllLeads: async (): Promise<ApiResponse<Lead[]>> => {
    return apiClient.get<Lead[]>('/leads');
  },

  createLead: async (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Lead>> => {
    return apiClient.post<Lead>('/leads', lead);
  },

  updateLeadStatus: async (id: string, status: Lead['status']): Promise<ApiResponse<Lead>> => {
    return apiClient.patch<Lead>(`/leads/${id}/status`, { status });
  },

  updateLead: async (id: string, lead: Partial<Lead>): Promise<ApiResponse<Lead>> => {
    return apiClient.put<Lead>(`/leads/${id}`, lead);
  },

  deleteLead: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/leads/${id}`);
  },

  getAllFollowUps: async (): Promise<ApiResponse<FollowUp[]>> => {
    return apiClient.get<FollowUp[]>('/follow-ups');
  },

  createFollowUp: async (followUp: Omit<FollowUp, 'id'>): Promise<ApiResponse<FollowUp>> => {
    return apiClient.post<FollowUp>('/follow-ups', followUp);
  },

  completeFollowUp: async (id: string): Promise<ApiResponse<FollowUp>> => {
    return apiClient.patch<FollowUp>(`/follow-ups/${id}/complete`);
  },
};
