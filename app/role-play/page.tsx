import { RolePlaySimulator } from "@/components/role-play-simulator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { HomeIcon } from "lucide-react"

export default function RolePlayPage() {
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
              <BreadcrumbPage>역할극 시뮬레이터</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold text-purple-800 mb-6">역할극 시뮬레이터</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RolePlaySimulator />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">역할극 시뮬레이터란?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700">
                  역할극 시뮬레이터는 다양한 사회적 상황을 안전하게 연습할 수 있는 공간입니다. AI가 다양한 상황에서 대화
                  상대 역할을 하며, 여러분의 응답에 대한 피드백을 제공합니다.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">시나리오 예시</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>새로운 사람 만나기</li>
                  <li>갈등 상황 해결하기</li>
                  <li>예의 있게 거절하기</li>
                  <li>도움 요청하기</li>
                  <li>감정 표현하기</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">사용 팁</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>자연스럽게 대화하세요</li>
                  <li>다양한 시나리오를 시도해보세요</li>
                  <li>피드백을 통해 개선점을 찾아보세요</li>
                  <li>어려운 상황은 여러 번 연습해보세요</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
