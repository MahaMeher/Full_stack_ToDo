export interface User {
  id: string;
  email: string;
  name?: string;
  themePreference?: 'light' | 'dark' | 'system';
  isAuthenticated: boolean;
  jwtToken?: string;
}

export interface UserSession {
  id: string;
  email: string;
  name?: string;
  themePreference: 'light' | 'dark' | 'system';
  isAuthenticated: boolean;
  jwtToken?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}