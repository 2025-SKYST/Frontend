"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/header';

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => router.push('/signin'), 2600);
      return () => clearTimeout(timer);
    }
  }, [isOpen, router]);

  const handleClick = () => setIsOpen(true);

  // 문만 회전 (힌지 위치 보정)
  const doorVariants = {
    closed: { rotateY: 0 },
    open:   { rotateY: -90, transition: { duration: 1, ease: 'easeInOut' } }
  };

  // 문 다 열린 뒤 풀스크린 화이트아웃
  const overlayVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1.1, duration: 0.7, ease: 'easeInOut' } }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main
        className="relative flex-1 overflow-hidden"
        style={{
          perspective: 1200,
          backgroundImage: "url('/combined-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        {/* ────────────────────────────────────
            1) 문 위치 고정 Wrapper (translate)
        ──────────────────────────────────── */}
        <div
          onClick={handleClick}
          className="cursor-pointer"
          style={{
            position: 'absolute',
            left: '50%',
            top: '45%',
            transform: 'translate(-50%, -50%)',
            width: '250px',
            height: '360px',
          }}
        >
          {/* ────────────────────────────────────
              2) 흰색 패널 (건드리지 말아달라 하셔서 그대로)
          ──────────────────────────────────── */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 40,
              width: '66%',
              height: '87%',
              backgroundColor: 'white',
              zIndex: 0,
            }}
          />

          {/* ────────────────────────────────────
              3) motion.div: 회전만 담당, 힌지 보정
          ──────────────────────────────────── */}
          <motion.div
            variants={doorVariants}
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            style={{
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transformOrigin: '40px 50%',   // ← 힌지 위치 보정
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: "url('/door.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
                zIndex: 1,
              }}
            />
          </motion.div>
        </div>

        {/* ────────────────────────────────────
            4) 전체 배경 오버레이 (문 다 열리고 난 뒤)
        ──────────────────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute inset-0 bg-white"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
