"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus } from "lucide-react"
import Header from "@/components/header"
import UserHeader from "@/components/user-header"

export default function AddPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const chapterId = params.id

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 여기에 AI 텍스트 생성 로직 추가
    // 실제로는 API 호출을 통해 텍스트를 생성

    setTimeout(() => {
      setIsLoading(false)
      // 생성된 페이지 ID로 이동
      router.push(`/chapter/${chapterId}/edit/new-page-id`)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <UserHeader />

      <main className="flex-1 p-6 bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">새 페이지 추가</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="image">이미지 업로드</Label>
                  <Input id="image" type="file" accept="image/*" onChange={handleImageChange} required />

                  {imagePreview && (
                    <div className="mt-4 relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="이미지 미리보기"
                        className="w-full h-64 object-contain border rounded-md"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">태그</Label>
                  <div className="flex">
                    <Input
                      id="tags"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="태그를 입력하고 Enter 또는 추가 버튼을 누르세요"
                      className="flex-1"
                    />
                    <Button type="button" onClick={addTag} className="ml-2 bg-amber-600 hover:bg-amber-500">
                      <Plus size={16} />
                    </Button>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <div key={tag} className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-amber-600 hover:text-amber-800"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">간단한 설명</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="이 페이지에 대한 간단한 설명을 입력하세요"
                    required
                  />
                </div>

                <CardFooter className="px-0 pt-4">
                  <div className="flex space-x-4 w-full">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => router.push(`/chapter/${chapterId}`)}
                    >
                      취소
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-amber-600 hover:bg-amber-500"
                      disabled={isLoading || !imagePreview || tags.length === 0 || !description}
                    >
                      {isLoading ? "생성 중..." : "AI로 회고록 생성하기"}
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
