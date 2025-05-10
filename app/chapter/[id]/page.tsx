"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft } from "lucide-react";
import Header from "@/components/header";
import UserHeader from "@/components/user-header";

interface Page {
  id: string;
  imageUrl: string;
  tags: string[];
  description: string;
  content: string;
}

export default function ViewChapter({ params }: { params: { id: string } }) {
  const router = useRouter();
  const chapterId = params.id;

  const [chapterTitle] = useState("어린 시절의 추억");
  const [pages] = useState<Page[]>([
    // {
    //   id: "1",
    //   imageUrl: "/childhood-playground.png",
    //   tags: ["어린시절", "놀이터", "친구"],
    //   description: "동네 놀이터에서 친구들과 놀던 기억",
    //   content:
    //     "작은 동네 놀이터에서 친구들과 함께 보낸 시간은 내 어린 시절의 가장 소중한 추억이다...",
    // },
    // {
    //   id: "2",
    //   imageUrl: "/family-dinner.png",
    //   tags: ["가족", "저녁식사", "대화"],
    //   description: "가족과 함께한 저녁 식사 시간",
    //   content:
    //     "매일 저녁 온 가족이 모여 식사를 하던 시간은 하루 중 가장 행복한 순간이었다...",
    // },
  ]);

  const addPage = (index: number) => {
    router.push(`/chapter/${chapterId}/add-page`);
  };

  // Calculate minimum width with more spacing for cards (match my-page)
  const minWidth = Math.max(1200, pages.length * 300 + 300);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <UserHeader />

      <main className="flex-1 p-6 bg-gradient-to-b from-amber-50 to-amber-100">
        {/* Header section constrained */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center">
            <Link href="/my-page">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="mr-2" size={16} />
                돌아가기
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-amber-900">
              {chapterTitle}
            </h1>
          </div>
        </div>

        {/* If no pages, show a central big plus */}
        {pages.length === 0 ? (
          <div className="w-full flex items-center justify-center py-32">
            <button
              onClick={() => addPage(0)}
              className="bg-amber-600 hover:bg-amber-500 text-white rounded-full p-8 shadow-lg transition-colors"
              aria-label="Add first page"
            >
              <PlusCircle size={64} />
            </button>
          </div>
        ) : (
          /* Timeline slider full-width */
          <div className="w-full overflow-x-auto pb-8">
            <div
              className="relative py-16 px-12"
              style={{ minWidth: `${minWidth}px` }}
            >
              <div className="absolute left-12 right-12 top-1/2 h-1 bg-amber-300 transform -translate-y-1/2 z-0" />
              <div className="relative z-10 flex items-center">
                <div className="flex items-center justify-center w-16 mr-12">
                  <button
                    onClick={() => addPage(0)}
                    className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
                    aria-label="Add page at beginning"
                  >
                    <PlusCircle size={24} />
                  </button>
                </div>

                <div
                  className="flex-grow grid gap-8"
                  style={{
                    gridTemplateColumns: `repeat(${pages.length * 2 - 1}, 1fr)`,
                    alignItems: "center",
                  }}
                >
                  {pages.map((page, index) => (
                    <>
                      <div
                        key={`page-${page.id}`}
                        className="flex flex-col items-center justify-center"
                      >
                        <Link
                          href={`/chapter/${chapterId}/edit/${page.id}`}
                          className="w-64"
                        >
                          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-36 overflow-hidden">
                              <img
                                src={page.imageUrl || "/placeholder.svg"}
                                alt={page.description}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3">
                              <div className="flex flex-wrap gap-1 mb-1">
                                {page.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <p className="text-amber-900 font-medium truncate">
                                {page.description}
                              </p>
                              <p className="text-amber-700 text-sm mt-1 line-clamp-2">
                                {page.content}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>

                      {index < pages.length - 1 && (
                        <div
                          key={`add-${page.id}`}
                          className="flex items-center justify-center"
                        >
                          <button
                            onClick={() => addPage(index + 1)}
                            className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
                            aria-label={`Add page after ${page.id}`}
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
                    onClick={() => addPage(pages.length)}
                    className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
                    aria-label="Add page at end"
                  >
                    <PlusCircle size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
