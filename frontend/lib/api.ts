import { getSession } from '@/lib/auth';
import { Task, TaskFormData } from '@/types/task';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      // Get session token if available
      const session = await getSession();
      const headers = {
        'Content-Type': 'application/json',
        ...(session?.jwtToken && { 'Authorization': `Bearer ${session.jwtToken}` }),
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          // If we can't parse the error response, use the status code
          console.warn('Could not parse error response:', parseError);
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      return { data, success: true };
    } catch (error: any) {
      // Log error for debugging
      console.error('API request error:', error);

      // Format error message for user
      let errorMessage = error.message || 'An error occurred';
      if (error.message.includes('fetch')) {
        errorMessage = 'Network error - please check your connection';
      }

      return { error: errorMessage, success: false };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async patch<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  // Task-specific API methods
  async getTasks(): Promise<ApiResponse<Task[]>> {
    return this.get<Task[]>('/api/tasks');
  }

  async getTask(id: string): Promise<ApiResponse<Task>> {
    return this.get<Task>(`/api/tasks/${id}`);
  }

  async createTask(taskData: TaskFormData): Promise<ApiResponse<Task>> {
    return this.post<Task>('/api/tasks', taskData);
  }

  async updateTask(id: string, taskData: Partial<TaskFormData>): Promise<ApiResponse<Task>> {
    return this.put<Task>(`/api/tasks/${id}`, taskData);
  }

  async deleteTask(id: string): Promise<ApiResponse<boolean>> {
    return this.delete<boolean>(`/api/tasks/${id}`);
  }

  async toggleTaskCompletion(id: string): Promise<ApiResponse<Task>> {
    return this.patch<Task>(`/api/tasks/${id}/complete`, {});
  }
}

export const apiClient = new ApiClient();