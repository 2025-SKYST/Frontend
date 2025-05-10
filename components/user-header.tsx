import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserCircle } from "lucide-react"

export default function UserHeader() {
  return (
    <div className="w-full py-4 px-6 bg-amber-700 text-amber-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <UserCircle size={32} />
          <span className="font-medium">홍길동님</span>
        </div>
        <Link href="/edit-profile">
          <Button variant="outline" className="text-amber-50 border-amber-50 hover:bg-amber-600">
            개인정보 수정
          </Button>
        </Link>
      </div>
    </div>
  )
}
