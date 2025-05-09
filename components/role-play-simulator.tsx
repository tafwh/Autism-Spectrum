"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SendIcon, RefreshCwIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Message = {
  role: "user" | "assistant"
  content: string
}

type Scenario = {
  id: string
  title: string
  description: string
  initialMessage: string
}

const scenarios: Scenario[] = [
  {
    id: "meeting-new-people",
    title: "새로운 사람 만나기",
    description: "처음 만난 사람과 대화하는 상황을 연습합니다.",
    initialMessage: "안녕하세요! 저는 민지라고 합니다. 오늘 이 모임에 처음 왔어요. 당신은 어떻게 지내세요?",
  },
  {
    id: "conflict-resolution",
    title: "갈등 해결하기",
    description: "친구와의 갈등 상황을 해결하는 연습을 합니다.",
    initialMessage: "지난번에 약속 시간에 늦게 와서 정말 미안해. 내가 너무 늦게 연락했지. 화가 많이 났었니?",
  },
  {
    id: "polite-refusal",
    title: "예의 있게 거절하기",
    description: "부담스러운 요청을 예의 있게 거절하는 연습을 합니다.",
    initialMessage: "이번 주말에 우리 집에서 하는 파티에 와줄 수 있니? 많은 사람들이 올 거야.",
  },
  {
    id: "asking-for-help",
    title: "도움 요청하기",
    description: "필요할 때 적절하게 도움을 요청하는 연습을 합니다.",
    initialMessage: "안녕하세요, 무엇을 도와드릴까요?",
  },
]

export function RolePlaySimulator() {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id)
  const [userInput, setUserInput] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const handleScenarioChange = (value: string) => {
    setSelectedScenario(value)
    resetConversation()
  }

  const resetConversation = () => {
    const scenario = scenarios.find((s) => s.id === selectedScenario)
    if (scenario) {
      setMessages([
        {
          role: "assistant",
          content: scenario.initialMessage,
        },
      ])
    }
  }

  const handleSendMessage = async () => {
    if (!userInput.trim()) return

    // Add user message to the conversation
    const updatedMessages = [...messages, { role: "user", content: userInput }]
    setMessages(updatedMessages)
    setUserInput("")
    setIsLoading(true)

    try {
      // Simulate AI response (in a real app, this would call an API)
      setTimeout(() => {
        const scenario = scenarios.find((s) => s.id === selectedScenario)
        let aiResponse = ""

        // Simple rule-based responses based on the scenario
        if (selectedScenario === "meeting-new-people") {
          aiResponse = "반가워요! 처음 만나는 자리는 항상 설레는 것 같아요. 어떤 계기로 이 모임에 오게 되셨나요?"
        } else if (selectedScenario === "conflict-resolution") {
          aiResponse =
            "네, 사실 조금 기다리느라 불편했어요. 하지만 연락해줘서 고마워요. 다음에는 미리 알려주면 좋을 것 같아요."
        } else if (selectedScenario === "polite-refusal") {
          aiResponse =
            "초대해줘서 고마워요. 하지만 이번 주말에는 이미 다른 약속이 있어서 참석하기 어려울 것 같아요. 다음에 기회가 되면 꼭 함께하고 싶어요."
        } else if (selectedScenario === "asking-for-help") {
          aiResponse = "물론이죠, 어떤 도움이 필요하신가요? 최대한 도와드리겠습니다."
        }

        setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }])

        // Add feedback message
        const feedback =
          "피드백: 대화를 잘 이어나가고 있습니다. 감정을 더 명확하게 표현하면 상대방이 더 잘 이해할 수 있을 것입니다."
        setMessages((prev) => [...prev, { role: "assistant", content: feedback }])

        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "오류 발생",
        description: "메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Initialize conversation when component mounts
  useState(() => {
    resetConversation()
  })

  const currentScenario = scenarios.find((s) => s.id === selectedScenario)

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-purple-800">{currentScenario?.title || "역할극 시뮬레이터"}</CardTitle>
          <Select value={selectedScenario} onValueChange={handleScenarioChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="시나리오 선택" />
            </SelectTrigger>
            <SelectContent>
              {scenarios.map((scenario) => (
                <SelectItem key={scenario.id} value={scenario.id}>
                  {scenario.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-gray-600 text-sm">{currentScenario?.description}</p>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="h-[400px] overflow-y-auto border rounded-md p-4 mb-4 bg-white">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 h-full flex items-center justify-center">
              <p>시나리오를 선택하고 대화를 시작하세요.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-purple-100 text-purple-900"
                        : message.content.startsWith("피드백:")
                          ? "bg-yellow-100 text-yellow-900 border border-yellow-300"
                          : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <Textarea
            placeholder="메시지를 입력하세요..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="resize-none"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !userInput.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetConversation} className="text-purple-600 border-purple-200">
          <RefreshCwIcon className="h-4 w-4 mr-2" />
          대화 초기화
        </Button>
        <div className="text-xs text-gray-500">대화 내용은 학습 및 피드백 제공을 위해 저장될 수 있습니다.</div>
      </CardFooter>
    </Card>
  )
}
