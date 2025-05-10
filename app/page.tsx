"use client"
import { useState, useEffect } from "react"
import React from "react"

import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
//import Header from '@/components/header';

import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const texts = [
    <React.Fragment key="text1">
      당신의 <span className="text-yellow-400">소중한 기억</span>을
    </React.Fragment>,
    <React.Fragment key="text2">
      아름다운 <span className="text-yellow-400">회고록</span>으로
    </React.Fragment>,
    <React.Fragment key="text3">AI의 도움으로 당신만의 특별한 회고록을 작성해보세요.</React.Fragment>,
    <React.Fragment key="text4">잊혀진 기억들이 아름다운 이야기로 다시 태어납니다.</React.Fragment>,
  ]

  const {isAuthenticated} = useAuth();

  useEffect(() => {
    if (isOpen) {
      const url = isAuthenticated ? "/my-page" : "/signin"
      const timer = setTimeout(() => router.push(url), 2600)
      return () => clearTimeout(timer)
    }
  }, [isOpen, router, isAuthenticated])

  // 텍스트 애니메이션을 위한 타이머
  useEffect(() => {
    if (textIndex < texts.length - 1) {
      const timer = setTimeout(() => {
        setTextIndex(textIndex + 1)
      }, 800) // 각 텍스트가 나타나는 간격
      return () => clearTimeout(timer)
    }
  }, [textIndex, texts.length])

  const handleClick = () => setIsOpen(true)

  // 문 회전 애니메이션
  const doorVariants = {
    closed: { rotateY: 0 },
    open: { rotateY: -90, transition: { duration: 1, ease: "easeInOut" } },
  }

  // 흰색 패널 주변 glow 애니메이션
  const glowVariants = {
    hidden: {
      boxShadow: "0px 0px 0px 0px rgba(255,255,255,0)",
    },
    visible: {
      boxShadow: "0px 0px 40px 20px rgba(255,255,255,0.6)",
      transition: { delay: 0.3, duration: 0.8, ease: "easeOut" },
    },
  }

  // 전체 화면 화이트아웃
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.7, duration: 0.5, ease: "easeInOut" } },
  }

  // 텍스트 애니메이션
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col overflow-auto">
      {/*<Header />*/}

      {/* 상단 검은색 섹션과 배경 이미지가 자연스럽게 연결되도록 */}
      <div className="relative">
        {/* 검은색 그라데이션 오버레이 */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent z-10"
          style={{ height: "70vh" }}
        ></div>

        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/combined-bg.jpg')",
            backgroundPosition: "center 39%",
            height: "100vh",
          }}
        ></div>

        {/* 텍스트 콘텐츠 */}
        <div className="relative z-20 pt-32 px-6 min-h-[60vh]">
          <div className="max-w-4xl mx-auto text-white">
            <div className="h-24 md:h-32 overflow-hidden">
              <AnimatePresence mode="wait">
                {textIndex >= 0 && (
                  <motion.h1
                    key="heading1"
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {texts[0]}
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            <div className="h-24 md:h-32 overflow-hidden">
              <AnimatePresence mode="wait">
                {textIndex >= 1 && (
                  <motion.h1
                    key="heading2"
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {texts[1]}
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            <div className="h-12 md:h-16 overflow-hidden">
              <AnimatePresence mode="wait">
                {textIndex >= 2 && (
                  <motion.p
                    key="paragraph1"
                    className="text-lg md:text-xl text-gray-300 max-w-3xl"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {texts[2]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="h-12 md:h-16 overflow-hidden">
              <AnimatePresence mode="wait">
                {textIndex >= 3 && (
                  <motion.p
                    key="paragraph2"
                    className="text-lg md:text-xl text-gray-300 max-w-3xl"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {texts[3]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <main
        id="door-section"
        className="relative flex-1 min-h-[80vh] overflow-hidden"
        style={{
          perspective: 1200,
          backgroundImage: "url('/combined-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 39%",
          marginTop: "-20vh", // 상단 섹션과 겹치게 하여 자연스러운 연결
        }}
      >
        {/* 1) 문 위치 고정 Wrapper */}
        <div
          onClick={handleClick}
          className="cursor-pointer"
          style={{
            position: "absolute",
            left: "50%",
            top: "45%",
            transform: "translate(-50%, -50%)",
            width: "250px",
            height: "360px",
          }}
        >
          {/* 2) glow 효과가 적용된 흰색 패널 */}
          <motion.div
            variants={glowVariants}
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            style={{
              position: "absolute",
              top: 24,
              left: 40,
              width: "66%",
              height: "87%",
              backgroundColor: "white",
              zIndex: 0,
              borderRadius: "2px", // 살짝 둥글려도 예쁩니다
            }}
          />

          {/* 3) 문 회전 Motion */}
          <motion.div
            variants={doorVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            style={{
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transformOrigin: "40px 50%",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: "url('/door.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>
        </div>

        {/* 문 클릭 안내 텍스트 */}
        <div className="absolute bottom-10 left-0 right-0 text-center text-white">
          <p className="text-lg font-medium drop-shadow-lg">문을 클릭하여 회고록 여행을 시작하세요</p>
        </div>
      </main>

      {/* 추가 콘텐츠 섹션 (스크롤 가능하도록) */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">회고록 서비스 특징</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-lime-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">쉬운 작성</h3>
              <p className="text-gray-600">사진과 간단한 설명만으로 AI가 아름다운 회고록을 작성해 드립니다.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-lime-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">챕터 구성</h3>
              <p className="text-gray-600">여러 챕터로 나누어 체계적으로 당신의 인생 이야기를 구성할 수 있습니다.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-lime-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">안전한 보관</h3>
              <p className="text-gray-600">
                당신의 소중한 기억과 이야기를 안전하게 보관하고 언제든지 열람할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 전체 화면 화이트아웃 효과 - 페이지 전체에 적용 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            style={{ pointerEvents: "none" }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
