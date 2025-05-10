"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"
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
  const bookRef = useRef<HTMLDivElement>(null)

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
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next")
  const [visiblePages, setVisiblePages] = useState<[number, number]>([0, 1])

  useEffect(() => {
    // 페이지 로드 시 책 효과 초기화
    if (bookRef.current) {
      bookRef.current.classList.add("book-open")
    }
  }, [])

  const goToPreviousPage = () => {
    if (currentPageIndex > 0 && !isFlipping) {
      setFlipDirection("prev")
      setIsFlipping(true)

      // 페이지 넘김 애니메이션 후 상태 업데이트
      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex - 2)
        setVisiblePages([currentPageIndex - 2, currentPageIndex - 1])
        setIsFlipping(false)
      }, 500)
    }
  }

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 2 && !isFlipping) {
      setFlipDirection("next")
      setIsFlipping(true)

      // 페이지 넘김 애니메이션 후 상태 업데이트
      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex + 2)
        setVisiblePages([currentPageIndex + 2, currentPageIndex + 3])
        setIsFlipping(false)
      }, 500)
    }
  }

  // 현재 표시할 페이지들 (왼쪽, 오른쪽)
  const leftPage = pages[visiblePages[0]] || null
  const rightPage = pages[visiblePages[1]] || null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <UserHeader />

      <main className="flex-1 p-6 bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto mb-6 flex justify-between items-center">
          <Button
            onClick={() => router.push("/my-page")}
            variant="outline"
            className="border-amber-600 text-amber-800 hover:bg-amber-100"
          >
            <Home size={16} className="mr-2" />
            돌아가기
          </Button>
          <h1 className="text-3xl font-bold text-amber-900">나의 회고록</h1>
          <div className="w-[100px]"></div> {/* 균형을 위한 빈 공간 */}
        </div>

        <div className="relative w-full max-w-5xl">
          {/* 책 표지 및 페이지 */}
          <div ref={bookRef} className={`book ${isFlipping ? `flipping ${flipDirection}` : ""}`}>
            {/* 책 바인딩 */}
            <div className="book-binding"></div>

            {/* 왼쪽 페이지 */}
            <div className="book-page book-page-left">
              {leftPage && (
                <div className="book-content">
                  <div className="page-header">
                    <h2 className="text-xl font-semibold text-amber-800">{leftPage.chapterTitle}</h2>
                    <p className="text-sm text-amber-600">{leftPage.description}</p>
                  </div>

                  <div className="page-image-container">
                    <img
                      src={leftPage.imageUrl || "/placeholder.svg"}
                      alt={leftPage.description}
                      className="page-image"
                    />
                    <div className="page-tags">
                      {leftPage.tags.map((tag) => (
                        <span key={tag} className="page-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="page-content">{leftPage.content}</div>

                  <div className="page-number">{visiblePages[0] + 1}</div>
                </div>
              )}
            </div>

            {/* 오른쪽 페이지 */}
            <div className="book-page book-page-right">
              {rightPage && (
                <div className="book-content">
                  <div className="page-header">
                    <h2 className="text-xl font-semibold text-amber-800">{rightPage.chapterTitle}</h2>
                    <p className="text-sm text-amber-600">{rightPage.description}</p>
                  </div>

                  <div className="page-image-container">
                    <img
                      src={rightPage.imageUrl || "/placeholder.svg"}
                      alt={rightPage.description}
                      className="page-image"
                    />
                    <div className="page-tags">
                      {rightPage.tags.map((tag) => (
                        <span key={tag} className="page-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="page-content">{rightPage.content}</div>

                  <div className="page-number">{visiblePages[1] + 1}</div>
                </div>
              )}
            </div>

            {/* 페이지 넘김 효과를 위한 요소 */}
            <div className="book-page-flip"></div>
          </div>

          {/* 페이지 넘김 버튼 */}
          <div className="navigation-buttons">
            <Button
              onClick={goToPreviousPage}
              disabled={currentPageIndex === 0 || isFlipping}
              className="nav-button prev-button"
              variant="ghost"
              size="icon"
            >
              <ChevronLeft size={24} />
            </Button>

            <Button
              onClick={goToNextPage}
              disabled={currentPageIndex >= pages.length - 2 || isFlipping}
              className="nav-button next-button"
              variant="ghost"
              size="icon"
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>

        <div className="mt-4 text-center text-amber-800">
          <p>
            페이지 {currentPageIndex + 1}-{Math.min(currentPageIndex + 2, pages.length)} / 총 {pages.length}페이지
          </p>
        </div>
      </main>

      <style jsx global>{`
  /* 책 스타일 */
  .book {
    position: relative;
    width: 100%;
    height: 70vh;
    max-height: 800px;
    display: flex;
    perspective: 1500px;
    margin: 0 auto;
    transition: transform 0.5s;
  }

  .book-open {
    transform: translateZ(0px);
  }

  .book-binding {
    position: absolute;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #8B4513, #A0522D, #8B4513);
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  }

  .book-page {
    position: relative;
    width: calc(50% - 15px);
    height: 100%;
    background-image: url("/book-bg.png");  /* 이미지 경로 확인! */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.5s;
    transform-origin: center;
    overflow: hidden;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .book-page::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(255, 248, 225, 0.7); /* 오버레이 */
    z-index: 0;
  }

  .book-content {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding-right: 10px;
    scrollbar-width: thin;
    scrollbar-color: #D4A76A transparent;
  }

  .book-content::-webkit-scrollbar {
    width: 6px;
  }

  .book-content::-webkit-scrollbar-thumb {
    background-color: #D4A76A;
    border-radius: 3px;
  }

  .book-page-left {
    left: 0;
    border-radius: 10px 0 0 10px;
  }

  .book-page-right {
    right: 0;
    border-radius: 0 10px 10px 0;
  }

  .book-page-flip {
    position: absolute;
    width: calc(50% - 15px);
    height: 100%;
    top: 0;
    right: 0;
    background-color: #FFF8E1;
    transform-origin: left center;
    transform: rotateY(0deg);
    transition: transform 0.5s ease-in-out;
    backface-visibility: hidden;
    border-radius: 0 10px 10px 0;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 2;
    opacity: 0;
  }

  .flipping.next .book-page-flip {
    opacity: 1;
    transform: rotateY(-180deg);
    right: 0;
    left: auto;
  }

  .flipping.prev .book-page-flip {
    opacity: 1;
    transform: rotateY(180deg);
    right: auto;
    left: 0;
    transform-origin: right center;
    border-radius: 10px 0 0 10px;
  }

  .page-header {
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #E6D9B8;
  }

  .page-image-container {
    margin-bottom: 15px;
  }

  .page-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  .page-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 8px;
  }

  .page-tag {
    font-size: 0.7rem;
    padding: 2px 8px;
    background-color: #F0E6D2;
    color: #8B4513;
    border-radius: 10px;
  }

  .page-content {
    flex: 1;
    font-family: serif;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #5D4037;
    white-space: pre-line;
    text-align: justify;
  }

  .page-number {
    align-self: center;
    font-size: 0.8rem;
    color: #8B4513;
    margin-top: 15px;
    font-style: italic;
  }

  .navigation-buttons {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    pointer-events: none;
  }

  .nav-button {
    background-color: rgba(255, 248, 225, 0.7);
    border: 1px solid #D4A76A;
    color: #8B4513;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    pointer-events: auto;
  }

  .nav-button:hover:not(:disabled) {
    background-color: rgba(212, 167, 106, 0.3);
  }

  .nav-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .prev-button {
    margin-left: -20px;
  }

  .next-button {
    margin-right: -20px;
  }

  @media (max-width: 768px) {
    .book {
      height: 60vh;
    }

    .book-page {
      padding: 15px;
    }

    .page-content {
      font-size: 0.85rem;
    }

    .page-image {
      height: 120px;
    }
  }

  @media (max-width: 480px) {
    .book-binding {
      width: 15px;
    }

    .book-page {
      width: calc(50% - 7.5px);
      padding: 10px;
    }

    .page-header h2 {
      font-size: 1rem;
    }

    .page-content {
      font-size: 0.8rem;
    }

    .page-image {
      height: 100px;
    }
  }
`}</style>

    </div>
  )
}
