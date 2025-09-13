'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/services/api';
import { AuthState, User } from '@/types/auth';
import { message } from 'antd';

// 创建认证上下文
interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 认证上下文提供者组件
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  // 从localStorage中获取token并解析用户信息
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        // 简单解析JWT token获取用户信息（实际项目中可能需要更安全的方式）
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        setState({
          isAuthenticated: true,
          user: {
            userId: payload.userId,
            username: payload.username,
          },
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Failed to parse token:', error);
        localStorage.removeItem('access_token');
        setState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Invalid token',
        });
      }
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // 登录方法
  const login = async (username: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await authApi.login(username, password);
      localStorage.setItem('access_token', response.access_token);
      
      // 简单解析JWT token获取用户信息
      const base64Url = response.access_token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      setState({
        isAuthenticated: true,
        user: {
          userId: payload.userId,
          username: payload.username,
        },
        loading: false,
        error: null,
      });
      
      message.success(response.message || '登录成功');
    } catch (error: any) {
      console.error('Login error:', error);
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error.response?.data?.message || '登录失败，请检查用户名和密码',
      });
      message.error(error.response?.data?.message || '登录失败，请检查用户名和密码');
    }
  };

  // 注册方法
  const register = async (username: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await authApi.register(username, password);
      localStorage.setItem('access_token', response.access_token);
      
      // 简单解析JWT token获取用户信息
      const base64Url = response.access_token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      setState({
        isAuthenticated: true,
        user: {
          userId: payload.userId,
          username: payload.username,
        },
        loading: false,
        error: null,
      });
      
      message.success(response.message || '注册成功');
    } catch (error: any) {
      console.error('Register error:', error);
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error.response?.data?.message || '注册失败，请稍后再试',
      });
      message.error(error.response?.data?.message || '注册失败，请稍后再试');
    }
  };

  // 登出方法
  const logout = () => {
    localStorage.removeItem('access_token');
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
    message.success('已退出登录');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 自定义Hook，方便在组件中使用认证上下文
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};