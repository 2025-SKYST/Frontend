"use client";
import { useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the Chapter type
interface Chapter {
  id: string;
  title: string;
  createdAt: string;
  pageCount: number;
  imageUrl?: string;
  tags: string[];
  description: string;
}

export default function MemoirTimeline() {
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
  ]);

  const addChapter = (index: number) => {
    const newChapterId = String(Date.now());
    const newChapter: Chapter = {
      id: newChapterId,
      title: `새 챕터 ${newChapterId}`,
      createdAt: new Date().toISOString().split("T")[0],
      pageCount: 0,
      imageUrl: "/placeholder.svg",
      tags: ["새로운", "챕터"],
      description: "새로운 챕터 설명을 입력하세요",
    };

    const newChapters = [...chapters];
    newChapters.splice(index, 0, newChapter);
    setChapters(newChapters);
  };

  // Calculate minimum width with more spacing for cards
  const minWidth = Math.max(1200, chapters.length * 300 + 300);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-amber-100 p-6">
      <h1 className="text-3xl font-bold text-amber-900 mb-8">나의 회고록</h1>

      {/* If no chapters, show a central big plus */}
      {chapters.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-32">
          <button
            onClick={() => addChapter(0)}
            className="bg-amber-600 hover:bg-amber-500 text-white rounded-full p-8 shadow-lg transition-colors"
            aria-label="Add first chapter"
          >
            <PlusCircle size={64} />
          </button>
        </div>
      ) : (
        <>
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-amber-800 mb-4">챕터 목록</h2>

            <div className="w-full overflow-x-auto pb-8">
              <div
                className="relative py-16 px-12"
                style={{ minWidth: `${minWidth}px` }}
              >
                <div className="absolute left-12 right-12 top-1/2 h-1 bg-amber-300 transform -translate-y-1/2 z-0" />

                <div className="relative z-10 flex items-center">
                  <div className="flex items-center justify-center w-16 mr-12">
                    <button
                      onClick={() => addChapter(0)}
                      className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
                      aria-label="Add chapter at beginning"
                    >
                      <PlusCircle size={24} />
                    </button>
                  </div>

                  <div
                    className="flex-grow grid gap-8"
                    style={{
                      gridTemplateColumns: `repeat(${chapters.length * 2 - 1}, 1fr)`,
                      alignItems: 'center',
                    }}
                  >
                    {chapters.map((chapter, index) => (
                      <>
                        <div
                          key={`chapter-${chapter.id}`}
                          className="flex flex-col items-center justify-center"
                        >
                          <Link href={`/chapter/${chapter.id}`} className="w-64">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                              <div className="h-36 overflow-hidden">
                                <img
                                  src={chapter.imageUrl || "/placeholder.svg"}
                                  alt={chapter.description}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-3">
                                <div className="flex flex-wrap gap-1 mb-1">
                                  {chapter.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <h3 className="font-medium text-amber-900 truncate">
                                  {chapter.title}
                                </h3>
                                <p className="text-xs text-amber-700 mt-1">
                                  {chapter.pageCount}페이지
                                </p>
                                <p className="text-xs text-amber-700 mt-1 line-clamp-2">
                                  {chapter.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>

                        {index < chapters.length - 1 && (
                          <div
                            key={`add-${chapter.id}`}
                            className="flex items-center justify-center"
                          >
                            <button
                              onClick={() => addChapter(index + 1)}
                              className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
                              aria-label={`Add chapter after ${chapter.title}`}
                            >
                              <PlusCircle size={16} />
                            </button>
                          </div>
                        )}
                      </>
                    ))}
                  </div>

                  <div className="flex items-center justify-center w-16 ml-12">
                    <button
                      onClick={() => addChapter(chapters.length)}
                      className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
                      aria-label="Add chapter at end"
                    >
                      <PlusCircle size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/memoir">
              <Button className="bg-amber-800 hover:bg-amber-700 text-white px-8 py-6 text-lg">
                전체 회고록 보기
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
