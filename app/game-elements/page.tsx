import { GameDashboard } from "@/components/game-dashboard"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { HomeIcon } from "lucide-react"

export default function GameElementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 pb-12">
      <div className="container mx-auto py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <HomeIcon className="h-4 w-4 mr-1" />홈
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>게임 요소</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold text-purple-800 mb-6">게임 요소</h1>

        <GameDashboard />
      </div>
    </div>
  )
}
