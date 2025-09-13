// 登录请求参数
export interface LoginRequest {
  username: string;
  password: string;
}

// 注册请求参数
export interface RegisterRequest {
  username: string;
  password: string;
}

// 认证响应
export interface AuthResponse {
  statusCode: number;
  message: string;
  access_token: string;
}

// 用户信息
export interface User {
  userId: string;
  username: string;
}

// 认证状态
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}