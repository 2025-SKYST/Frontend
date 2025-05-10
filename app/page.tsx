"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
//import Header from '@/components/header';

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

  // 문 회전 애니메이션
  const doorVariants = {
    closed: { rotateY: 0 },
    open:   { rotateY: -90, transition: { duration: 1, ease: 'easeInOut' } }
  };

  // 흰색 패널 주변 glow 애니메이션
  const glowVariants = {
    hidden:  {
      boxShadow: '0px 0px 0px 0px rgba(255,255,255,0)'
    },
    visible: {
      boxShadow: '0px 0px 40px 20px rgba(255,255,255,0.6)',
      transition: { delay: 0.3, duration: 0.8, ease: 'easeOut' }
    }
  };

  // 전체 화면 화이트아웃
  const overlayVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1.1, duration: 0.7, ease: 'easeInOut' } }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/*<Header />*/}

      <main
        className="relative flex-1 overflow-hidden"
        style={{
          perspective: 1200,
          backgroundImage: "url('/combined-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 39%',
        }}
      >
        {/* 1) 문 위치 고정 Wrapper */}
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
          {/* 2) glow 효과가 적용된 흰색 패널 */}
          <motion.div
            variants={glowVariants}
            initial="hidden"
            animate={isOpen ? 'visible' : 'hidden'}
            style={{
              position: 'absolute',
              top: 24,
              left: 40,
              width: '66%',
              height: '87%',
              backgroundColor: 'white',
              zIndex: 0,
              borderRadius: '2px',      // 살짝 둥글려도 예쁩니다
            }}
          />

          {/* 3) 문 회전 Motion */}
          <motion.div
            variants={doorVariants}
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            style={{
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transformOrigin: '40px 50%',
              zIndex: 1,
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
              }}
            />
          </motion.div>
        </div>

        {/* 4) 문 다 열리고 나서 전체 화면 화이트아웃 */}
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
