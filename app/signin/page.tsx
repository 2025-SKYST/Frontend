"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"

export default function SignIn() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 인증 로직 추가
    console.log("로그인 시도:", formData)
    router.push("/my-page")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-amber-50 to-amber-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">로그인</CardTitle>
            <CardDescription className="text-center">나의 회고록 서비스에 로그인하세요.</CardDescription>
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
