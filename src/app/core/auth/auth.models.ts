export interface User {
  id: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user_id: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}