import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  // 启用跨域请求携带凭证
  withCredentials: true,
});

// 请求拦截器 - 添加token到请求头
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 处理401错误 - 未授权
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      // 使用zustand的方式处理登出
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// 认证相关API
export const authApi = {
  // 用户登录
  login: async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 用户注册
  register: async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 检查用户是否已登录
  checkAuth: () => {
    return localStorage.getItem('access_token') !== null;
  },

  // 退出登录
  logout: () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  }
};

export default api;