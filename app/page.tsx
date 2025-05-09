import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { UserIcon, HeartIcon, BrainIcon, AwardIcon, BarChartIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <header className="container mx-auto py-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">소셜 지원 웹 애플리케이션</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            자폐 스펙트럼 사용자를 위한 공감 능력 향상, 사회적 상호작용 개선, 스트레스 없는 의사소통 연습을 위한
            플랫폼입니다.
          </p>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            title="역할극 시뮬레이터"
            description="다양한 사회적 상황을 텍스트 또는 음성으로 시뮬레이션하고 AI 피드백을 받아보세요."
            icon={<UserIcon className="h-8 w-8 text-purple-600" />}
            href="/role-play"
          />
          <FeatureCard
            title="감정 거울"
            description="텍스트와 음성 입력에 대한 실시간 감정 분석과 피드백을 제공합니다."
            icon={<HeartIcon className="h-8 w-8 text-purple-600" />}
            href="/emotion-mirror"
          />
          <FeatureCard
            title="윤리적 판단 트레이너"
            description="일상적인 도덕적 딜레마 상황에서의 의사결정 훈련을 도와드립니다."
            icon={<BrainIcon className="h-8 w-8 text-purple-600" />}
            href="/ethical-trainer"
          />
          <FeatureCard
            title="자원 봉사자 연결"
            description="정기적인 연습을 위한 자원 봉사자와의 매칭 서비스를 제공합니다."
            icon={<UserIcon className="h-8 w-8 text-purple-600" />}
            href="/volunteer-connect"
          />
          <FeatureCard
            title="맞춤형 피드백"
            description="채팅 기록과 감정 분석을 바탕으로 정기적인 진행 보고서를 제공합니다."
            icon={<BarChartIcon className="h-8 w-8 text-purple-600" />}
            href="/feedback"
          />
          <FeatureCard
            title="게임 요소"
            description="소셜 포인트, 업적 배지, 데일리 챌린지 등 다양한 게임 요소를 경험해보세요."
            icon={<AwardIcon className="h-8 w-8 text-purple-600" />}
            href="/game-elements"
          />
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">서비스 개요</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-purple-700 mb-2">목표</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>공감 능력 향상</li>
                <li>사회적 상호작용 개선</li>
                <li>스트레스 없는 의사소통 연습</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-700 mb-2">대상</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>아스퍼거 증후군</li>
                <li>감정 인식이 어려운 사람들</li>
                <li>사회적 상호작용에 어려움을 겪는 사람들</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">지금 시작해보세요</h2>
          <p className="text-gray-600 mb-6">소셜 지원 웹 애플리케이션을 통해 더 나은 사회적 상호작용을 경험해보세요.</p>
          <Link href="/register">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md">회원가입</Button>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 소셜 지원 웹 애플리케이션. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <Card className="h-full transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-center mb-2">{icon}</div>
        <CardTitle className="text-xl text-center text-purple-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 text-center">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href={href}>
          <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            자세히 보기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
