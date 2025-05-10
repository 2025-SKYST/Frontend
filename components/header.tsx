import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full py-4 px-6 bg-amber-800 text-amber-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          나의 회고록
        </Link>
        <div className="space-x-2">
          <Link href="/signin">
            <Button className="bg-amber-600 hover:bg-amber-500 text-white">
              로그인
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-amber-600 hover:bg-amber-500 text-white">회원가입</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
