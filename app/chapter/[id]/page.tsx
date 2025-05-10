"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft, Trash2 } from "lucide-react";
import Header from "@/components/header";
import UserHeader from "@/components/user-header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";

interface Page {
  id: string;
  imageUrl: string;
  tags: string[];
  description: string;
  content: string;
}

export default function ViewChapter() {
  const router = useRouter();
  const params = useParams();
  const chapterId = params?.id as string;
  const { getAuthHeader } = useAuth();

  const [chapterTitle] = useState("어린 시절의 추억");
  const [pages, setPages] = useState<Page[]>([
    {
      id: "1",
      imageUrl: "/childhood-playground.png",
      tags: ["어린시절", "놀이터", "친구"],
      description: "동네 놀이터에서 친구들과 놀던 기억",
      content:
        "작은 동네 놀이터에서 친구들과 함께 보낸 시간은 내 어린 시절의 가장 소중한 추억이다...",
    },
    {
      id: "2",
      imageUrl: "/family-dinner.png",
      tags: ["가족", "저녁식사", "대화"],
      description: "가족과 함께한 저녁 식사 시간",
      content:
        "매일 저녁 온 가족이 모여 식사를 하던 시간은 하루 중 가장 행복한 순간이었다...",
    },
  ]);

  const [deletePageId, setDeletePageId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const header = getAuthHeader();
    // if there's no auth header (no token), kick to login
    if (!header || Object.keys(header).length === 0) {
      // replace so user can’t click “back” into this page
      router.replace("/signin");
      return;
    }
  }, [getAuthHeader]);

  const addPage = (index: number) => {
    router.push(`/chapter/${chapterId}/add-page`);
  };

  const handleDeleteClick = (pageId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDeletePageId(pageId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletePageId) {
      setPages(pages.filter((page) => page.id !== deletePageId));
      setDeletePageId(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gradient-to-b from-rose-50 to-orange-50">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-rose-900">{chapterTitle}</h1>
            <Link href="/my-page">
              <Button
                variant="outline"
                className="border-rose-600 text-rose-800 hover:bg-orange-100"
              >
                돌아가기
                <ArrowLeft className="ml" size={16} />
              </Button>
            </Link>
          </div>
        </div>

        {pages.length === 0 ? (
          <div className="w-full flex items-center justify-center py-32">
            <button
              onClick={() => addPage(0)}
              className="bg-rose-400 hover:bg-orange-300 text-white rounded-full p-8 shadow-lg transition-colors"
              aria-label="Add first page"
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
                    onClick={() => addPage(0)}
                    className="w-10 h-10 rounded-full bg-rose-400 text-white flex items-center justify-center hover:bg-orange-300 transition-colors"
                    aria-label="Add page at beginning"
                  >
                    <PlusCircle size={24} />
                  </button>
                </div>

                <div
                  className="grid gap-8 justify-center mx-auto"
                  style={{
                    display: "inline-grid",
                    gridTemplateColumns: `repeat(${pages.length * 2 - 1}, 1fr)`,
                    alignItems: "center",
                  }}
                >
                  {pages.map((page, index) => (
                    <React.Fragment key={`pair-${page.id}`}>
                      <div className="flex flex-col items-center justify-center">
                        <Link
                          href={`/chapter/${chapterId}/edit/${page.id}`}
                          className="w-96 relative group" // ← 너비 확대
                        >
                          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <button
                              onClick={(e) => handleDeleteClick(page.id, e)}
                              className="absolute top-2 right-2 w-7 h-7 bg-white/80 hover:bg-red-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 text-red-500 hover:text-red-600"
                              aria-label="페이지 삭제"
                            >
                              <Trash2 size={14} />
                            </button>
                            <div className="h-48 overflow-hidden">
                              {" "}
                              {/* ← 이미지 크기 확대 */}
                              <img
                                src={page.imageUrl || "/placeholder.svg"}
                                alt={page.description}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-5">
                              {" "}
                              {/* ← 여백 확대 */}
                              <div className="flex flex-wrap gap-1 mb-1">
                                {page.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 bg-orange-100 text-rose-700 text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <p className="text-rose-900 font-medium truncate">
                                {page.description}
                              </p>
                              <p className="text-orange-700 text-sm mt-1 line-clamp-2">
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
                            className="w-8 h-8 rounded-full bg-rose-400 text-white flex items-center justify-center hover:bg-orange-300 transition-colors"
                            aria-label={`Add page after ${page.id}`}
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
                    onClick={() => addPage(pages.length)}
                    className="w-10 h-10 rounded-full bg-rose-400 text-white flex items-center justify-center hover:bg-orange-300 transition-colors"
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

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>페이지 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 페이지를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
