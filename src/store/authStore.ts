'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types/auth';
import { authApi } from '@/services/api';
import { message } from 'antd';

interface AuthStore extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  parseToken: (token: string) => User | null;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      loading: false,  // 将初始loading状态设置为false
      error: null,

      // 解析JWT token获取用户信息
      parseToken: (token: string): User | null => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const payload = JSON.parse(window.atob(base64));
          
          return {
            userId: payload.userId,
            username: payload.username,
          };
        } catch (error) {
          console.error('Failed to parse token:', error);
          return null;
        }
      },

      // 登录方法
      login: async (username: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const response = await authApi.login(username, password);
          const token = response.access_token;
          localStorage.setItem('access_token', token);
          
          const user = useAuthStore.getState().parseToken(token);
          
          if (!user) {
            throw new Error('无效的用户信息');
          }
          set({
            isAuthenticated: true,
            user,
            loading: false,
            error: null,
          });
          message.success(response.message || '登录成功');
        } catch (error: any) {
          console.error('Login error:', error);
          set({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: error.response?.data?.message || '登录失败，请检查用户名和密码',
          });
          message.error(error.response?.data?.message || '登录失败，请检查用户名和密码');
        }
      },

      // 注册方法
      register: async (username: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const response = await authApi.register(username, password);
          const token = response.access_token;
          localStorage.setItem('access_token', token);
          
          const user = useAuthStore.getState().parseToken(token);
          
          if (!user) {
            throw new Error('无效的用户信息');
          }
          set({
            isAuthenticated: true,
            user,
            loading: false,
            error: null,
          });
          message.success(response.message || '注册成功');
        } catch (error: any) {
          console.error('Register error:', error);
          set({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: error.response?.data?.message || '注册失败，请稍后再试',
          });
          message.error(error.response?.data?.message || '注册失败，请稍后再试');
        }
      },

      // 登出方法
      logout: () => {
        localStorage.removeItem('access_token');
        set({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: null,
        });
        message.success('已退出登录');
      },
      
      setLoading: (loading: boolean) => {
        set({ loading });
      },
    }),
    {
      name: 'auth-storage', // 持久化存储的名称
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
      // 初始化时检查token
      onRehydrateStorage: () => {
        return (state) => {
          if (!state) return;
          
          // 初始化完成后检查token
          const token = localStorage.getItem('access_token');
          if (token) {
            const user = state.parseToken(token);
            if (user) {
              // 使用useAuthStore.setState而不是set
              useAuthStore.setState({ 
                user,
                isAuthenticated: true,
                loading: false
              });
            } else {
              localStorage.removeItem('access_token');
              useAuthStore.setState({
                isAuthenticated: false,
                user: null,
                loading: false
              });
            }
          } else {
            useAuthStore.setState({ loading: false });
          }
        };
      },
    }
  )
);