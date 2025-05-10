"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle, ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import UserHeader from "@/components/user-header"

interface Page {
  id: string
  imageUrl: string
  tags: string[]
  description: string
  content: string
}

export default function ViewChapter({ params }: { params: { id: string } }) {
  const router = useRouter()
  const chapterId = params.id

  const [chapterTitle, setChapterTitle] = useState("어린 시절의 추억")
  const [pages, setPages] = useState<Page[]>([
    {
      id: "1",
      imageUrl: "/childhood-playground.png",
      tags: ["어린시절", "놀이터", "친구"],
      description: "동네 놀이터에서 친구들과 놀던 기억",
      content:
        "작은 동네 놀이터에서 친구들과 함께 보낸 시간은 내 어린 시절의 가장 소중한 추억이다. 그 시절에는 스마트폰도, 인터넷도 없었지만 우리는 항상 웃음이 넘쳤다...",
    },
    {
      id: "2",
      imageUrl: "/family-dinner.png",
      tags: ["가족", "저녁식사", "대화"],
      description: "가족과 함께한 저녁 식사 시간",
      content:
        "매일 저녁 온 가족이 모여 식사를 하던 시간은 하루 중 가장 행복한 순간이었다. 아버지의 유머와 어머니의 따뜻한 음식, 형제들과의 재미있는 대화가 오갔던 그 시간이 그립다...",
    },
  ])

  const addPage = () => {
    // 실제로는 이미지 업로드 페이지로 이동
    router.push(`/chapter/${chapterId}/add-page`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <UserHeader />

      <main className="flex-1 p-6 bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Link href="/my-page">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="mr-2" size={16} />
                돌아가기
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-amber-900">{chapterTitle}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {pages.map((page) => (
              <Link key={page.id} href={`/chapter/${chapterId}/edit/${page.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={page.imageUrl || "/placeholder.svg"}
                      alt={page.description}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {page.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-amber-900 font-medium">{page.description}</p>
                    <p className="text-amber-700 text-sm mt-2 line-clamp-2">{page.content}</p>
                  </div>
                </div>
              </Link>
            ))}

            <button
              onClick={addPage}
              className="flex flex-col items-center justify-center h-64 bg-amber-50 border-2 border-dashed border-amber-300 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <PlusCircle size={48} className="text-amber-500 mb-2" />
              <span className="text-amber-800 font-medium">새 페이지 추가</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
