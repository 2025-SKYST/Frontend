import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-900">미지의 도서관에 오신 것을 환영합니다</h1>
          <p className="text-xl md:text-2xl text-amber-800">
            당신만의 특별한 회고록을 AI의 도움으로 작성해보세요. 잊혀진 기억들이 아름다운 이야기로 다시 태어납니다.
          </p>
          <p className="text-lg text-amber-700">
            사진, 태그, 간단한 설명만 있으면 AI가 당신의 추억을 아름다운 문장으로 표현해 드립니다. 당신의 인생 이야기를
            책으로 남겨보세요.
          </p>

          <div className="mt-12 relative">
            <div className="w-32 h-48 mx-auto relative">
              <div className="absolute inset-0 bg-amber-800 rounded-t-lg shadow-lg transform transition-transform hover:scale-105">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-16 bg-amber-600 rounded-full ml-16"></div>
                </div>
                <Link href="/signin">
                  <Button className="absolute inset-0 w-full h-full opacity-0">입장하기</Button>
                </Link>
              </div>
              <p className="absolute -bottom-8 w-full text-center text-amber-900">입장하기</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
