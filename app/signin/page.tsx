"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Header from "@/components/header"

import { signIn } from "@/lib/authService"
import { useAuth } from "@/hooks/useAuth"

export default function SignIn() {
  const router = useRouter()
  const auth = useAuth()

  const [formData, setFormData] = useState({
    id: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // 로그인 API 호출 (필드 이름은 email 이지만, id 입력값을 그대로 넘깁니다)
      const { accessToken, refreshToken } = await signIn({
        login_id: formData.id,
        password: formData.password,
      })
      // context에 저장
      auth.login(accessToken, refreshToken)
      // 로그인 후 이동
      router.push("/my-page")
    } catch (err: any) {
      console.error(err)
      alert(err.message || "로그인에 실패했습니다.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-amber-50 to-amber-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">로그인</CardTitle>
            <CardDescription className="text-center">
              나의 회고록 서비스에 로그인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id">아이디</Label>
                <Input
                  id="id"
                  name="id"
                  type="text"
                  required
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="아이디를 입력해 주세요."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 입력해 주세요."
                />
              </div>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-500">
                로그인
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p>
              계정이 없으신가요?{" "}
              <Link href="/signup" className="text-amber-600 hover:underline">
                회원가입
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
