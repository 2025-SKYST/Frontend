// hooks/useAuth.ts
"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import * as authService from "../lib/authService"  // ← 상대 경로

interface AuthContextType {
  isAuthenticated: boolean
  accessToken: string | null
  login: (at: string) => void
  logout: () => void
  getAuthHeader: () => { Authorization: string } | {}
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem("accessToken")
  )

  useEffect(() => {
    // 15분마다 토큰 갱신 예시
    const iv = setInterval(async () => {
      try {
        const data = await authService.refreshAccessToken()
        setAccessToken(data.accessToken)
        localStorage.setItem("accessToken", data.accessToken)
      } catch {
        setAccessToken(null)
        localStorage.removeItem("accessToken")
      }
    }, 15 * 60 * 1000)
    return () => clearInterval(iv)
  }, [])

  const login = (at: string) => {
    setAccessToken(at)
    localStorage.setItem("accessToken", at)
  }

  const logout = () => {
    setAccessToken(null)
    localStorage.removeItem("accessToken")
    authService.signOut()
  }

  const getAuthHeader = () =>
    accessToken ? { Authorization: `Bearer ${accessToken}` } : {}

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
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
