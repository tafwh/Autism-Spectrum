"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AwardIcon, TrophyIcon, CalendarIcon, ShoppingCartIcon } from "lucide-react"

type Achievement = {
  id: string
  title: string
  description: string
  progress: number
  maxProgress: number
  unlocked: boolean
}

type Challenge = {
  id: string
  title: string
  description: string
  reward: number
  completed: boolean
}

type RewardItem = {
  id: string
  title: string
  description: string
  cost: number
  image: string
}

export function GameDashboard() {
  const [points, setPoints] = useState<number>(250)
  const [level, setLevel] = useState<number>(3)
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "conflict-master",
      title: "갈등 해결의 달인",
      description: "10번의 갈등 해결 시나리오를 성공적으로 완료하세요.",
      progress: 7,
      maxProgress: 10,
      unlocked: false,
    },
    {
      id: "emotion-master",
      title: "감정 마스터",
      description: "감정 거울을 20번 사용하세요.",
      progress: 20,
      maxProgress: 20,
      unlocked: true,
    },
    {
      id: "social-butterfly",
      title: "소셜 버터플라이",
      description: "5명의 다른 사용자와 대화를 나누세요.",
      progress: 3,
      maxProgress: 5,
      unlocked: false,
    },
    {
      id: "daily-streak",
      title: "꾸준함의 힘",
      description: "7일 연속으로 앱을 사용하세요.",
      progress: 5,
      maxProgress: 7,
      unlocked: false,
    },
  ])

  const [dailyChallenges, setDailyChallenges] = useState<Challenge[]>([
    {
      id: "express-feelings",
      title: "감정 표현하기",
      description: "오늘의 기분을 3문장으로 표현하세요.",
      reward: 20,
      completed: false,
    },
    {
      id: "positive-feedback",
      title: "긍정적인 피드백",
      description: "다른 사용자에게 긍정적인 피드백을 남기세요.",
      reward: 15,
      completed: true,
    },
    {
      id: "role-play",
      title: "역할극 연습",
      description: "역할극 시뮬레이터에서 새로운 시나리오를 시도하세요.",
      reward: 25,
      completed: false,
    },
  ])

  const [rewardItems, setRewardItems] = useState<RewardItem[]>([
    {
      id: "premium-avatar",
      title: "프리미엄 아바타",
      description: "특별한 프리미엄 아바타를 사용할 수 있습니다.",
      cost: 300,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "theme-pack",
      title: "테마 팩",
      description: "앱의 색상 테마를 변경할 수 있습니다.",
      cost: 200,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "gift-card",
      title: "기프티콘",
      description: "실제 커피 기프티콘으로 교환할 수 있습니다.",
      cost: 500,
      image: "/placeholder.svg?height=80&width=80",
    },
  ])

  const completeChallenge = (id: string) => {
    setDailyChallenges(
      dailyChallenges.map((challenge) => {
        if (challenge.id === id && !challenge.completed) {
          setPoints(points + challenge.reward)
          return { ...challenge, completed: true }
        }
        return challenge
      }),
    )
  }

  const purchaseReward = (id: string, cost: number) => {
    if (points >= cost) {
      setPoints(points - cost)
      // In a real app, this would update the user's inventory
      alert(`성공적으로 ${rewardItems.find((item) => item.id === id)?.title}을(를) 구매했습니다!`)
    }
  }

  const progressToNextLevel = (level * 100) % 500
  const pointsToNextLevel = 500 - progressToNextLevel

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-purple-800">소셜 포인트</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-700 mb-2">{points}</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>레벨 {level}</span>
                <span>레벨 {level + 1}</span>
              </div>
              <Progress value={progressToNextLevel / 5} className="h-2" />
              <p className="text-xs text-gray-500">다음 레벨까지 {pointsToNextLevel} 포인트 필요</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-purple-800">소셜 랭크</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <TrophyIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-purple-700">소셜 탐험가</div>
                <p className="text-sm text-gray-600">상위 30% 사용자</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                다음 랭크: <span className="font-medium">소셜 마스터</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">레벨 5에 도달하면 잠금 해제됩니다</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-purple-800">통계</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">완료한 역할극</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">감정 분석 횟수</span>
                <span className="font-medium">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">연속 사용일</span>
                <span className="font-medium">5일</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">획득한 배지</span>
                <span className="font-medium">7/20</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger
            value="achievements"
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
          >
            <AwardIcon className="h-4 w-4 mr-2" />
            업적
          </TabsTrigger>
          <TabsTrigger
            value="challenges"
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            데일리 챌린지
          </TabsTrigger>
          <TabsTrigger
            value="rewards"
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
          >
            <ShoppingCartIcon className="h-4 w-4 mr-2" />
            리워드 상점
          </TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-purple-800">업적</CardTitle>
              <CardDescription>특별한 목표를 달성하고 배지를 획득하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                          {achievement.unlocked && (
                            <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">완료</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      <div className="bg-purple-100 p-2 rounded-full">
                        <AwardIcon
                          className={`h-6 w-6 ${achievement.unlocked ? "text-purple-600" : "text-gray-400"}`}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>진행도</span>
                        <span>
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-purple-800">데일리 챌린지</CardTitle>
              <CardDescription>매일 새로운 챌린지를 완료하고 포인트를 획득하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyChallenges.map((challenge) => (
                  <div key={challenge.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">{challenge.title}</h3>
                          {challenge.completed && (
                            <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">완료</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                      <div className="bg-purple-100 p-2 rounded-full">
                        <CalendarIcon
                          className={`h-6 w-6 ${challenge.completed ? "text-purple-600" : "text-gray-400"}`}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center text-sm text-purple-700">
                        <span>+{challenge.reward} 포인트</span>
                      </div>
                      {!challenge.completed && (
                        <Button
                          onClick={() => completeChallenge(challenge.id)}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          size="sm"
                        >
                          완료하기
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-purple-800">리워드 상점</CardTitle>
              <CardDescription>포인트를 사용하여 특별한 아이템을 구매하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {rewardItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 flex flex-col">
                    <div className="flex justify-center mb-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="h-20 w-20 object-cover rounded"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 text-center">{item.title}</h3>
                    <p className="text-sm text-gray-600 text-center mb-3">{item.description}</p>
                    <div className="mt-auto">
                      <div className="flex justify-center items-center text-sm text-purple-700 mb-2">
                        <span>{item.cost} 포인트</span>
                      </div>
                      <Button
                        onClick={() => purchaseReward(item.id, item.cost)}
                        className={`w-full ${points >= item.cost ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300"} text-white`}
                        disabled={points < item.cost}
                      >
                        구매하기
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
