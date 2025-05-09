"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { RefreshCwIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type EmotionAnalysis = {
  emotions: {
    [key: string]: number
  }
  dominantEmotion: string
  feedback: string
  wordAnalysis: {
    frequentWords: string[]
    emotionalWords: string[]
  }
}

export function EmotionMirror() {
  const [userInput, setUserInput] = useState<string>("")
  const [analysis, setAnalysis] = useState<EmotionAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const handleAnalyze = async () => {
    if (!userInput.trim()) return

    setIsLoading(true)

    try {
      // Simulate API call for emotion analysis
      setTimeout(() => {
        // This is a mock analysis - in a real app, this would come from an AI model
        const mockAnalysis: EmotionAnalysis = {
          emotions: {
            기쁨: 0.2,
            슬픔: 0.1,
            분노: 0.05,
            불안: 0.3,
            중립: 0.35,
          },
          dominantEmotion: "중립",
          feedback:
            "텍스트에서 약간의 불안감이 감지됩니다. 더 명확한 감정 표현을 위해 구체적인 상황과 느낌을 설명해보세요. 긍정적인 단어를 더 사용하면 전체적인 톤이 바뀔 수 있습니다.",
          wordAnalysis: {
            frequentWords: ["생각", "것", "같아요"],
            emotionalWords: ["걱정", "불안", "희망"],
          },
        }

        setAnalysis(mockAnalysis)
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error analyzing text:", error)
      toast({
        title: "오류 발생",
        description: "텍스트 분석 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const resetAnalysis = () => {
    setUserInput("")
    setAnalysis(null)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl text-purple-800">감정 거울</CardTitle>
        <p className="text-gray-600 text-sm">텍스트를 입력하면 감정 분석과 피드백을 제공합니다.</p>
      </CardHeader>
      <CardContent className="pb-3 space-y-4">
        <Textarea
          placeholder="분석할 텍스트를 입력하세요..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="resize-none h-32"
        />

        <div className="flex justify-end">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading || !userInput.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? "분석 중..." : "감정 분석하기"}
          </Button>
        </div>

        {isLoading && (
          <div className="text-center p-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">텍스트를 분석하고 있습니다...</p>
          </div>
        )}

        {analysis && (
          <div className="space-y-6 bg-white p-4 rounded-lg border">
            <div>
              <h3 className="text-lg font-medium text-purple-800 mb-2">감정 분석</h3>
              <div className="space-y-2">
                {Object.entries(analysis.emotions).map(([emotion, value]) => (
                  <div key={emotion} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{emotion}</span>
                      <span>{Math.round(value * 100)}%</span>
                    </div>
                    <Progress value={value * 100} className="h-2" />
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                주요 감정: <span className="font-medium">{analysis.dominantEmotion}</span>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-purple-800 mb-2">피드백</h3>
              <p className="text-gray-700">{analysis.feedback}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-purple-800 mb-2">단어 분석</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">자주 사용한 단어</h4>
                  <div className="flex flex-wrap gap-1">
                    {analysis.wordAnalysis.frequentWords.map((word, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">감정이 담긴 단어</h4>
                  <div className="flex flex-wrap gap-1">
                    {analysis.wordAnalysis.emotionalWords.map((word, index) => (
                      <span key={index} className="bg-purple-100 px-2 py-1 rounded-full text-xs text-purple-700">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetAnalysis} className="text-purple-600 border-purple-200">
          <RefreshCwIcon className="h-4 w-4 mr-2" />
          초기화
        </Button>
        <div className="text-xs text-gray-500">분석 내용은 학습 및 피드백 제공을 위해 저장될 수 있습니다.</div>
      </CardFooter>
    </Card>
  )
}
