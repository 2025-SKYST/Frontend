"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Header from "@/components/header"
import UserHeader from "@/components/user-header"

interface Page {
  id: string
  chapterId: string
  chapterTitle: string
  imageUrl: string
  tags: string[]
  description: string
  content: string
}

export default function Memoir() {
  const router = useRouter()

  const [pages, setPages] = useState<Page[]>([
    {
      id: "1",
      chapterId: "1",
      chapterTitle: "어린 시절의 추억",
      imageUrl: "/childhood-playground.png",
      tags: ["어린시절", "놀이터", "친구"],
      description: "동네 놀이터에서 친구들과 놀던 기억",
      content: `작은 동네 놀이터에서 친구들과 함께 보낸 시간은 내 어린 시절의 가장 소중한 추억이다. 그 시절에는 스마트폰도, 인터넷도 없었지만 우리는 항상 웃음이 넘쳤다.

매일 오후 학교가 끝나면 우리는 놀이터에 모였다. 녹슨 미끄럼틀과 그네, 시소는 우리에게 최고의 놀이기구였다. 특히 그네에서 누가 더 높이 올라갈 수 있는지 경쟁하던 순간들이 생생하다.

여름이면 물총 싸움을 하고, 겨울이면 눈사람을 만들었다. 계절마다 다른 놀이를 즐겼지만, 우리의 웃음소리는 언제나 동네를 가득 채웠다.`,
    },
    {
      id: "2",
      chapterId: "1",
      chapterTitle: "어린 시절의 추억",
      imageUrl: "/family-dinner.png",
      tags: ["가족", "저녁식사", "대화"],
      description: "가족과 함께한 저녁 식사 시간",
      content: `매일 저녁 온 가족이 모여 식사를 하던 시간은 하루 중 가장 행복한 순간이었다. 아버지의 유머와 어머니의 따뜻한 음식, 형제들과의 재미있는 대화가 오갔던 그 시간이 그립다.

식탁 위에는 항상 어머니의 정성이 담긴 음식들이 가득했다. 특히 명절이나 특별한 날에는 더욱 풍성한 음식들로 식탁이 채워졌고, 그 맛은 지금도 잊을 수 없다.

때로는 사소한 일로 다투기도 했지만, 그 모든 순간이 지금은 소중한 추억이 되었다. 가족과 함께한 저녁 식사 시간은 단순히 음식을 먹는 시간이 아니라, 서로의 하루를 나누고 유대감을 쌓는 소중한 시간이었다.`,
    },
    {
      id: "3",
      chapterId: "2",
      chapterTitle: "대학 생활",
      imageUrl: "/bustling-university-campus.png",
      tags: ["대학", "캠퍼스", "청춘"],
      description: "캠퍼스에서의 첫 날",
      content: `대학 캠퍼스에 첫 발을 디딘 그 날의 설렘은 아직도 생생하다. 넓은 잔디밭과 오래된 건물들, 그리고 다양한 사람들로 가득한 캠퍼스는 나에게 새로운 세계였다.

오리엔테이션 날, 같은 과 학생들과 처음 만났던 순간부터 대학 생활의 모험이 시작되었다. 서로 어색한 인사를 나누며 시작된 관계가 지금은 평생의 친구가 되었다.

강의실에 앉아 교수님의 첫 강의를 들으며 느꼈던 지적 호기심과 약간의 두려움, 그리고 캠퍼스를 돌아다니며 길을 잃었던 순간들까지, 모든 것이 새롭고 흥미로웠다.`,
    },
  ])

  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const currentPage = pages[currentPageIndex]

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <UserHeader />

      <main className="flex-1 p-6 bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-amber-900">나의 회고록</h1>
            <Button
              onClick={() => router.push("/my-page")}
              variant="outline"
              className="border-amber-600 text-amber-800 hover:bg-amber-100"
            >
              돌아가기
            </Button>
          </div>

          <div className="flex justify-center mb-4">
            <h2 className="text-xl font-semibold text-amber-800">
              {currentPage.chapterTitle} - {currentPageIndex + 1}/{pages.length}
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
              {/* 책 왼쪽 페이지 (이미지 및 정보) */}
              <div className="md:w-1/3 bg-amber-50 p-6 flex flex-col">
                <div className="mb-4">
                  <img
                    src={currentPage.imageUrl || "/placeholder.svg"}
                    alt={currentPage.description}
                    className="w-full h-48 object-cover rounded-md shadow-sm"
                  />
                </div>
                <h3 className="text-lg font-medium text-amber-900 mb-2">{currentPage.description}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentPage.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 책 오른쪽 페이지 (내용) */}
              <div className="md:w-2/3 p-6 bg-amber-50 border-l border-amber-200">
                <div className="prose prose-amber max-w-none font-serif text-lg leading-relaxed whitespace-pre-line">
                  {currentPage.content}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-8 mt-8">
            <Button
              onClick={goToPreviousPage}
              disabled={currentPageIndex === 0}
              className="bg-amber-600 hover:bg-amber-500"
            >
              <ChevronLeft className="mr-2" size={16} />
              이전 페이지
            </Button>
            <Button
              onClick={goToNextPage}
              disabled={currentPageIndex === pages.length - 1}
              className="bg-amber-600 hover:bg-amber-500"
            >
              다음 페이지
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
