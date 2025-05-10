"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Edit, Save, X, Plus } from "lucide-react"
import Header from "@/components/header"
import UserHeader from "@/components/user-header"

export default function EditPage({ params }: { params: { id: string; pageId: string } }) {
  const router = useRouter()
  const { id: chapterId, pageId } = params

  const [isEditing, setIsEditing] = useState(false)
  const [isEditingMetadata, setIsEditingMetadata] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [page, setPage] = useState({
    id: pageId,
    imageUrl: "/childhood-playground.png",
    tags: ["어린시절", "놀이터", "친구"],
    description: "동네 놀이터에서 친구들과 놀던 기억",
    content: `작은 동네 놀이터에서 친구들과 함께 보낸 시간은 내 어린 시절의 가장 소중한 추억이다. 그 시절에는 스마트폰도, 인터넷도 없었지만 우리는 항상 웃음이 넘쳤다.

매일 오후 학교가 끝나면 우리는 놀이터에 모였다. 녹슨 미끄럼틀과 그네, 시소는 우리에게 최고의 놀이기구였다. 특히 그네에서 누가 더 높이 올라갈 수 있는지 경쟁하던 순간들이 생생하다.

여름이면 물총 싸움을 하고, 겨울이면 눈사람을 만들었다. 계절마다 다른 놀이를 즐겼지만, 우리의 웃음소리는 언제나 동네를 가득 채웠다.

친구들과 나눈 작은 비밀들, 함께 꾸었던 꿈들, 그리고 때로는 다투기도 했던 그 순간들이 모두 내 마음속에 따뜻한 기억으로 남아있다.

지금 생각해보면, 그 시절의 단순함과 순수함이 얼마나 소중한 것이었는지 깨닫게 된다. 복잡한 어른의 세계에서 살아가는 지금, 가끔은 그 놀이터로 돌아가 무한한 상상력을 펼치던 그 시절이 그립다.`,
  })

  const [editedContent, setEditedContent] = useState(page.content)
  const [editedTags, setEditedTags] = useState<string[]>([...page.tags])
  const [editedDescription, setEditedDescription] = useState(page.description)
  const [newTag, setNewTag] = useState("")

  const handleRegenerate = () => {
    setIsRegenerating(true)

    // 실제로는 AI API 호출
    setTimeout(() => {
      setPage({
        ...page,
        content: `작은 동네 놀이터는 내 어린 시절의 천국이었다. 학교가 끝나면 친구들과 함께 모여 해가 질 때까지 놀았던 그 곳에서의 추억은 지금도 내 마음 속에 선명하게 남아있다.

녹슨 그네에서 하늘을 향해 발을 구르며 더 높이 올라가려 했던 순간들, 미끄럼틀에서 내려오며 느꼈던 짜릿함, 모래 위에 앉아 비밀 이야기를 나누던 시간들이 모두 소중한 보물이 되었다.

우리는 단순한 놀이에도 무한한 상상력을 더해 매일을 모험으로 만들었다. 때로는 우주 탐험가가 되어 미지의 행성을 탐사하고, 때로는 용감한 기사가 되어 상상 속 드래곤과 싸웠다.

계절이 바뀌어도 놀이터는 언제나 우리의 아지트였다. 봄에는 꽃잎을 모아 꽃반지를 만들고, 여름에는 물총 싸움을, 가을에는 낙엽을 모아 산을 만들고, 겨울에는 눈사람을 만들며 매 순간을 즐겼다.

지금 돌이켜보면, 그 놀이터에서의 시간들이 내 인생에서 가장 순수하고 행복한 순간들이었음을 깨닫는다. 복잡한 어른의 세계에서 살아가는 지금, 가끔은 그 단순했던 시절로 돌아가고 싶다는 생각이 든다.`,
      })
      setEditedContent(page.content)
      setIsRegenerating(false)
    }, 2000)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleEditMetadata = () => {
    setIsEditingMetadata(true)
  }

  const handleSave = () => {
    setPage({
      ...page,
      content: editedContent,
    })
    setIsEditing(false)
  }

  const handleSaveMetadata = () => {
    setPage({
      ...page,
      tags: editedTags,
      description: editedDescription,
    })
    setIsEditingMetadata(false)
  }

  const handleCancel = () => {
    setEditedContent(page.content)
    setIsEditing(false)
  }

  const handleCancelMetadata = () => {
    setEditedTags([...page.tags])
    setEditedDescription(page.description)
    setIsEditingMetadata(false)
  }

  const handleFinish = () => {
    router.push(`/chapter/${chapterId}`)
  }

  const addTag = () => {
    if (newTag.trim() && !editedTags.includes(newTag.trim())) {
      setEditedTags([...editedTags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setEditedTags(editedTags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <UserHeader />

      <main className="flex-1 p-6 bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-amber-900">{page.description}</h1>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleRegenerate}
                disabled={isRegenerating || isEditing}
                className="flex items-center"
              >
                <RefreshCw size={16} className={`mr-2 ${isRegenerating ? "animate-spin" : ""}`} />
                {isRegenerating ? "재생성 중..." : "재생성"}
              </Button>

              {!isEditing ? (
                <Button onClick={handleEdit} className="bg-amber-600 hover:bg-amber-500 flex items-center">
                  <Edit size={16} className="mr-2" />
                  텍스트 편집
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={handleCancel} className="flex items-center">
                    <X size={16} className="mr-2" />
                    취소
                  </Button>
                  <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-500 flex items-center">
                    <Save size={16} className="mr-2" />
                    저장
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/3">
              <Card className="overflow-hidden">
                <img
                  src={page.imageUrl || "/placeholder.svg"}
                  alt={page.description}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  {!isEditingMetadata ? (
                    <>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {page.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-amber-900 font-medium">{page.description}</p>
                      <Button
                        onClick={handleEditMetadata}
                        variant="ghost"
                        className="mt-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 p-0 h-auto"
                      >
                        <Edit size={14} className="mr-1" />
                        태그 및 설명 편집
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-1">태그</label>
                        <div className="flex mb-2">
                          <Input
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="새 태그 추가"
                            className="flex-1 text-sm"
                          />
                          <Button type="button" onClick={addTag} className="ml-2 bg-amber-600 hover:bg-amber-500 h-9">
                            <Plus size={14} />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {editedTags.map((tag) => (
                            <div
                              key={tag}
                              className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs"
                            >
                              <span>{tag}</span>
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 text-amber-600 hover:text-amber-800"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-1">설명</label>
                        <Textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          className="text-sm"
                          rows={3}
                        />
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" onClick={handleCancelMetadata} className="flex-1 text-xs h-8">
                          취소
                        </Button>
                        <Button
                          onClick={handleSaveMetadata}
                          className="flex-1 bg-amber-600 hover:bg-amber-500 text-xs h-8"
                        >
                          저장
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="md:w-2/3">
              <Card className="p-6 min-h-[400px] bg-amber-50 shadow-md">
                {isEditing ? (
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="min-h-[400px] font-serif text-lg leading-relaxed bg-amber-50 border-amber-200 focus-visible:ring-amber-500"
                  />
                ) : (
                  <div className="prose prose-amber max-w-none font-serif text-lg leading-relaxed whitespace-pre-line">
                    {page.content}
                  </div>
                )}
              </Card>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <Button variant="outline" onClick={() => router.push(`/chapter/${chapterId}`)} className="px-8">
              취소
            </Button>
            <Button onClick={handleFinish} className="bg-amber-800 hover:bg-amber-700 px-8">
              완료
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
