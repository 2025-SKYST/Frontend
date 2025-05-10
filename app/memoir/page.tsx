"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ChevronLeft, ChevronRight, Home, Share2Icon } from "lucide-react"
import Header from "@/components/header"

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
  const soundRef = useRef<HTMLAudioElement | null>(null)

  const [pages] = useState<Page[]>([
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
    if (bookRef.current) {
      bookRef.current.classList.add("book-open")
    }
    if (!soundRef.current) {
      soundRef.current = new Audio("/sounds/page-flip.mp3")
    }
  }, [])

  const playFlipSound = () => {
    if (!soundRef.current) return
    soundRef.current.currentTime = 0
    soundRef.current.play()
  }

  const goToPreviousPage = () => {
    if (currentPageIndex > 0 && !isFlipping) {
      playFlipSound()
      setFlipDirection("prev")
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex - 2)
        setVisiblePages([currentPageIndex - 2, currentPageIndex - 1])
        setIsFlipping(false)
      }, 500)
    }
  }

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 2 && !isFlipping) {
      playFlipSound()
      setFlipDirection("next")
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex + 2)
        setVisiblePages([currentPageIndex + 2, currentPageIndex + 3])
        setIsFlipping(false)
      }, 500)
    }
  }

  const leftPage = pages[visiblePages[0]] || null
  const rightPage = pages[visiblePages[1]] || null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-4 bg-gradient-to-b from-rose-50 to-orange-50 flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto mt-12 mb-2 flex justify-between items-center">
          <Button
            onClick={() => router.push("/my-page")}
            variant="outline"
            className="border-rose-600 text-rose-800 hover:bg-orange-100"
          >
            <Share2Icon size={16} className="mr-2" />
            돌아가기
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText("https://www.memory123.store/memoir");
              toast.success("링크가 복사되었습니다!");
            }}
            variant="outline"
            className="border-rose-600 text-rose-800 hover:bg-orange-100"
          >
            <Share2Icon size={16} className="mr-2" />
            공유하기
          </Button>
          <h1 className="text-3xl font-bold text-rose-900">나의 회고록</h1>
          <div className="w-[100px]"></div>
        </div>

        <div className="book-outer-wrapper">
          <div className="book-wrapper">
            <div
              ref={bookRef}
              className={`book-container ${isFlipping ? `flipping ${flipDirection}` : ""}`}
            >
              <div className="book-background">
                <img src="/book-template.png" alt="Book template" className="book-image" />

                {leftPage && (
                  <div className="left-page-content">
                    <div className="page-header">
                      <h2 className="text-xl font-semibold text-rose-900">{leftPage.chapterTitle}</h2>
                      <p className="text-sm text-orange-700">{leftPage.description}</p>
                    </div>
                    <div className="page-image-container">
                      <img
                        src={leftPage.imageUrl || "/placeholder.svg"}
                        alt={leftPage.description}
                        className="page-image"
                      />
                    </div>
                    <div className="page-content">{leftPage.content}</div>
                    <div className="page-number">{visiblePages[0] + 1}</div>
                  </div>
                )}

                {rightPage && (
                  <div className="right-page-content">
                    <div className="page-header">
                      <h2 className="text-xl font-semibold text-rose-900">{rightPage.chapterTitle}</h2>
                      <p className="text-sm text-orange-700">{rightPage.description}</p>
                    </div>
                    <div className="page-image-container">
                      <img
                        src={rightPage.imageUrl || "/placeholder.svg"}
                        alt={rightPage.description}
                        className="page-image"
                      />
                    </div>
                    <div className="page-content">{rightPage.content}</div>
                    <div className="page-number">{visiblePages[1] + 1}</div>
                  </div>
                )}

                <div className="page-flip-effect"></div>
              </div>
            </div>

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
        </div>

        <div className="mt-4 text-center text-rose-800">
          <p>
            페이지 {currentPageIndex + 1}-{Math.min(currentPageIndex + 2, pages.length)} / 총{" "}
            {pages.length}페이지
          </p>
        </div>
      </main>

      <style jsx global>{`
        /* 책 외부 래퍼 스타일 */
        .book-outer-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
        }
        
        /* 책 래퍼 스타일 */
        .book-wrapper {
          position: relative;
          width: 100%;
          max-width: 1400px;
          height: 95vh;
          max-height: 1200px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
        }
        
        /* 책 컨테이너 스타일 */
        .book-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1500px;
          transition: transform 0.5s;
        }
        
        .book-background {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .book-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* 페이지 콘텐츠 스타일 */
        .left-page-content,
        .right-page-content {
          position: absolute;
          width: 38%;
          height: 72%;
          top: 14%;
          z-index: 2;
          overflow-y: auto;
          padding: 30px;
          display: flex;
          flex-direction: column;
          scrollbar-width: thin;
          scrollbar-color: rgba(225, 29, 72, 0.3) transparent;
        }
        
        .left-page-content::-webkit-scrollbar,
        .right-page-content::-webkit-scrollbar {
          width: 4px;
        }
        
        .left-page-content::-webkit-scrollbar-thumb,
        .right-page-content::-webkit-scrollbar-thumb {
          background-color: rgba(225, 29, 72, 0.3);
          border-radius: 2px;
        }
        
        .left-page-content {
          left: 11%;
        }
        
        .right-page-content {
          right: 10.5%;
        }
        
        .page-header {
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(225, 29, 72, 0.2);
        }
        
        .page-image-container {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
        }
        
        .page-image {
          width: 100%;
          max-height: 200px;
          object-fit: contain;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .page-content {
          flex: 1;
          font-family: serif;
          font-size: 1rem;
          line-height: 1.6;
          color: #000000;
          white-space: pre-line;
          text-align: justify;
        }
        
        .page-number {
          align-self: center;
          font-size: 0.9rem;
          color: #000000;
          margin-top: 20px;
          font-style: italic;
        }
        
        /* 페이지 넘김 효과 */
        .page-flip-effect {
          position: absolute;
          width: 43%;
          height: 73%;
          top: 12.1%;
          right: 11%;
          background-color: rgba(255, 255, 255, 0.9);
          transform-origin: left center;
          transform: rotateY(0deg);
          transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
          backface-visibility: hidden;
          z-index: 3;
          opacity: 0;
          pointer-events: none;
        }
        
        .flipping.next .page-flip-effect {
          opacity: 1;
          transform: rotateY(-180deg);
          left: auto;
          right: 6.3%;
          transform-origin: left center;
        }
        
        .flipping.prev .page-flip-effect {
          opacity: 1;
          transform: rotateY(180deg);
          right: auto;
          left: 7.5%;
          transform-origin: right center;
        }
        
        /* 네비게이션 버튼 */
        .navigation-buttons {
          position: absolute;
          width: 120%;
          display: flex;
          justify-content: space-between;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          pointer-events: none;
        }
        
        .nav-button {
          background-color: rgba(255, 237, 213, 0.7);
          border: 1px solid #FB923C;
          color: #E11D48;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          pointer-events: auto;
        }
        
        .nav-button:hover:not(:disabled) {
          background-color: rgba(251, 146, 60, 0.3);
        }
        
        .nav-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        /* 반응형 스타일 (기존과 동일) */
        @media (max-width: 1400px) { /* ... */ }
        @media (max-width: 1200px) { /* ... */ }
        @media (max-width: 992px) { /* ... */ }
        @media (max-width: 768px) { /* ... */ }
        @media (max-width: 576px) { /* ... */ }
      `}</style>
    </div>
  )
}
