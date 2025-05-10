"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Header from "@/components/header"
import UserHeader from "@/components/user-header"

interface Chapter {
  id: string
  title: string
  createdAt: string
  pageCount: number
}

export default function MyPage() {
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: "1", title: "어린 시절의 추억", createdAt: "2023-01-15", pageCount: 5 },
    { id: "2", title: "대학 생활", createdAt: "2023-02-20", pageCount: 3 },
  ])

  const addChapter = (index: number) => {
    const newChapterId = String(Date.now())
    const newChapter: Chapter = {
      id: newChapterId,
      title: `새 챕터 ${newChapterId}`,
      createdAt: new Date().toISOString().split("T")[0],
      pageCount: 0,
    }

    const newChapters = [...chapters]
    newChapters.splice(index, 0, newChapter)
    setChapters(newChapters)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <UserHeader />

      <main className="flex-1 p-6 bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-amber-900 mb-8">나의 회고록</h1>

          <div className="mb-12">
            <h2 className="text-xl font-semibold text-amber-800 mb-4">챕터 목록</h2>

            <div className="relative py-12">
              {/* 챕터 타임라인 */}
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-amber-300 transform -translate-y-1/2"></div>

              <div className="flex justify-between relative">
                {/* 첫 번째 + 버튼 */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => addChapter(0)}
                    className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center z-10 hover:bg-amber-500 transition-colors"
                  >
                    <PlusCircle size={24} />
                  </button>
                </div>

                {/* 챕터들 */}
                {chapters.map((chapter, index) => (
                  <div key={chapter.id} className="flex flex-col items-center mx-4">
                    <Link href={`/chapter/${chapter.id}`}>
                      <div className="w-16 h-16 rounded-full bg-amber-800 text-white flex items-center justify-center z-10 mb-2 hover:bg-amber-700 transition-colors">
                        {index + 1}
                      </div>
                    </Link>
                    <div className="text-center">
                      <h3 className="font-medium text-amber-900">{chapter.title}</h3>
                      <p className="text-sm text-amber-700">{chapter.pageCount}페이지</p>
                    </div>

                    {/* 챕터 사이의 + 버튼 */}
                    {index < chapters.length - 1 && (
                      <div className="absolute" style={{ left: `${(index + 1) * (100 / (chapters.length + 1))}%` }}>
                        <button
                          onClick={() => addChapter(index + 1)}
                          className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center z-10 hover:bg-amber-500 transition-colors"
                        >
                          <PlusCircle size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {/* 마지막 + 버튼 */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => addChapter(chapters.length)}
                    className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center z-10 hover:bg-amber-500 transition-colors"
                  >
                    <PlusCircle size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/memoir">
              <Button className="bg-amber-800 hover:bg-amber-700 text-white px-8 py-6 text-lg">전체 회고록 보기</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
