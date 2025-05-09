import { EmotionMirror } from "@/components/emotion-mirror"
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

export default function EmotionMirrorPage() {
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
              <BreadcrumbPage>감정 거울</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold text-purple-800 mb-6">감정 거울</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EmotionMirror />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">감정 거울이란?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700">
                  감정 거울은 여러분의 텍스트 입력에 대한 감정 분석을 제공합니다. 어떤 감정이 표현되고 있는지, 어떤 단어
                  선택이 이루어졌는지, 그리고 어떻게 더 명확하게 감정을 표현할 수 있는지에 대한 피드백을 받을 수
                  있습니다.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">분석되는 요소</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>감정 톤</li>
                  <li>단어 선택</li>
                  <li>표현의 명확성</li>
                  <li>자주 사용하는 단어</li>
                  <li>문맥적 의미</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">사용 팁</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>자연스럽게 글을 작성하세요</li>
                  <li>다양한 감정을 표현해보세요</li>
                  <li>피드백을 통해 감정 표현 방식을 개선해보세요</li>
                  <li>정기적으로 사용하여 발전을 추적하세요</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
