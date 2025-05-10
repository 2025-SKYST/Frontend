"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as authService from "../lib/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  getAuthHeader: () => { Authorization: string } | {};
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // 초기값은 null
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // 클라이언트 마운트 후에만 localStorage에서 불러오기
  useEffect(() => {
    const at = localStorage.getItem("accessToken");
    const rt = localStorage.getItem("refreshToken");
    if (at) setAccessToken(at);
    if (rt) setRefreshToken(rt);
  }, []);

  // 9분마다 자동 갱신
  useEffect(() => {
    if (!refreshToken) return; 
    const iv = setInterval(async () => {
      try {
        const data = await authService.refreshAccessToken(refreshToken);
        setAccessToken(data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);

        if (data.refreshToken) {
          setRefreshToken(data.refreshToken);
          localStorage.setItem("refreshToken", data.refreshToken);
        }
      } catch (e) {
        console.error("토큰 갱신 실패:", e);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }, 9 * 60 * 1000);
    return () => clearInterval(iv);
  }, [refreshToken]);

  const login = (at: string, rt: string) => {
    setAccessToken(at);
    setRefreshToken(rt);
    localStorage.setItem("accessToken", at);
    localStorage.setItem("refreshToken", rt);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    authService.signOut();
  };

  const getAuthHeader = () =>
    accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        accessToken,
        login,
        logout,
        getAuthHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
