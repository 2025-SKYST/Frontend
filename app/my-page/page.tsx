"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Chapter {
  id: string
  title: string
  createdAt: string
  pageCount: number
  imageUrl?: string
  tags: string[]
  description: string
}

export default function MemoirTimeline() {
  const router = useRouter()

  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: "1",
      title: "어린 시절의 추억",
      createdAt: "2023-01-15",
      pageCount: 5,
      imageUrl: "/childhood-playground.png",
      tags: ["어린시절", "놀이터", "친구"],
      description: "동네 놀이터에서 친구들과 놀던 기억",
    },
    {
      id: "2",
      title: "대학 생활",
      createdAt: "2023-02-20",
      pageCount: 3,
      imageUrl: "/family-dinner.png",
      tags: ["가족", "저녁식사", "대화"],
      description: "가족과 함께한 저녁 식사 시간",
    },
  ])

  const [deleteChapterId, setDeleteChapterId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const addChapter = (index: number) => {
    const newChapterId = String(chapters.length + 1)
    const newChapter: Chapter = {
      id: newChapterId,
      title: `새 챕터 ${newChapterId}`,
      createdAt: new Date().toISOString().split("T")[0],
      pageCount: 0,
      imageUrl: "/placeholder.svg",
      tags: ["새로운", "챕터"],
      description: "새로운 챕터 설명을 입력하세요",
    }

    const newChapters = [...chapters]
    newChapters.splice(index, 0, newChapter)
    setChapters(newChapters)
  }

  const handleDeleteClick = (chapterId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDeleteChapterId(chapterId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (deleteChapterId) {
      setChapters(chapters.filter((chapter) => chapter.id !== deleteChapterId))
      setDeleteChapterId(null)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gradient-to-b from-rose-50 to-orange-50">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-rose-900">챕터 목록</h1>
          </div>
        </div>

        {chapters.length === 0 ? (
          <div className="w-full flex items-center justify-center py-32">
            <button
              onClick={() => addChapter(0)}
              className="bg-rose-400 hover:bg-orange-300 text-white rounded-full p-8 shadow-lg transition-colors"
              aria-label="Add first chapter"
            >
              <PlusCircle size={64} />
            </button>
          </div>
        ) : (
          <div className="w-full overflow-x-auto pb-8">
            <div className="relative py-16 px-12 min-w-fit">
              <div className="absolute left-12 right-12 top-1/2 h-1 bg-orange-200 transform -translate-y-1/2 z-0" />

              <div className="relative z-10 flex items-center justify-center">
                <div className="flex items-center justify-center w-16 mr-12">
                  <button
                    onClick={() => addChapter(0)}
                    className="w-10 h-10 rounded-full bg-rose-400 text-white flex items-center justify-center hover:bg-orange-300 transition-colors"
                    aria-label="Add chapter at beginning"
                  >
                    <PlusCircle size={24} />
                  </button>
                </div>

                <div
                  className="grid gap-8 justify-center mx-auto"
                  style={{
                    display: "inline-grid",
                    gridTemplateColumns: `repeat(${chapters.length * 2 - 1}, 1fr)`,
                    alignItems: "center",
                  }}
                >
                  {chapters.map((chapter, index) => (
                    <React.Fragment key={`pair-${chapter.id}`}>
                      <div className="relative w-96 flex flex-col items-center justify-center">
                        <div className="absolute bottom-4 left-4 w-full h-full bg-white rounded-lg shadow-md"></div>
                        <div className="absolute bottom-2 left-2 w-full h-full bg-white rounded-lg shadow-md"></div>
                        <Link href={`/chapter/${chapter.id}`} className="w-96 relative group">
                          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <button
                              onClick={(e) => handleDeleteClick(chapter.id, e)}
                              className="absolute top-2 right-2 w-7 h-7 bg-white/80 hover:bg-red-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 text-red-500 hover:text-red-600"
                              aria-label="챕터 삭제"
                            >
                              <Trash2 size={14} />
                            </button>
                            <div className="h-48 overflow-hidden">
                              <img
                                src={chapter.imageUrl || "/placeholder.svg"}
                                alt={chapter.description}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-5">
                              <div className="flex flex-wrap gap-1 mb-1">
                                {chapter.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 bg-orange-100 text-rose-700 text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <p className="text-rose-900 font-medium truncate">{chapter.title}</p>
                              <p className="text-orange-700 text-sm mt-1">{chapter.pageCount}페이지</p>
                              <p className="text-orange-700 text-sm mt-1 line-clamp-2">{chapter.description}</p>
                            </div>
                          </div>
                        </Link>
                      </div>

                      {index < chapters.length - 1 && (
                        <div key={`add-${chapter.id}`} className="flex items-center justify-center">
                          <button
                            onClick={() => addChapter(index + 1)}
                            className="w-8 h-8 rounded-full bg-rose-400 text-white flex items-center justify-center hover:bg-orange-300 transition-colors"
                            aria-label={`Add chapter after ${chapter.title}`}
                          >
                            <PlusCircle size={16} />
                          </button>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex items-center justify-center w-16 ml-12">
                  <button
                    onClick={() => addChapter(chapters.length)}
                    className="w-10 h-10 rounded-full bg-rose-400 text-white flex items-center justify-center hover:bg-orange-300 transition-colors"
                    aria-label="Add chapter at end"
                  >
                    <PlusCircle size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/memoir">
            <Button className="bg-rose-800 hover:bg-rose-700 text-white px-8 py-6 text-lg">전체 회고록 보기</Button>
          </Link>
        </div>
      </main>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>챕터 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 챕터를 정말 삭제하시겠습니까? 챕터에 포함된 모든 페이지가 함께 삭제되며, 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
