// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  message?: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  company?: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Store Types
export interface RootState {
  auth: AuthState;
}

// Action Types
export interface AuthAction {
  type: string;
  payload?: unknown;
  meta?: unknown;
  error?: unknown;
} 