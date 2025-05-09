import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    const systemPrompt = `당신은 자폐 스펙트럼 사용자를 위한 감정 분석 AI입니다.
    사용자가 입력한 텍스트를 분석하고 다음 형식의 JSON으로 응답하세요:
    {
      "emotions": {
        "기쁨": 0.0-1.0,
        "슬픔": 0.0-1.0,
        "분노": 0.0-1.0,
        "불안": 0.0-1.0,
        "중립": 0.0-1.0
      },
      "dominantEmotion": "가장 강한 감정",
      "feedback": "감정 표현에 대한 건설적인 피드백",
      "wordAnalysis": {
        "frequentWords": ["자주", "사용된", "단어들"],
        "emotionalWords": ["감정이", "담긴", "단어들"]
      }
    }`

    const { text: analysisText } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: text,
    })

    // JSON 파싱
    const analysis = JSON.parse(analysisText)

    return Response.json(analysis)
  } catch (error) {
    console.error("Error in emotion API:", error)
    return Response.json({ error: "Failed to analyze emotions" }, { status: 500 })
  }
}
