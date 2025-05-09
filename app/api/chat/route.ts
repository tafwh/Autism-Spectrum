import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { message, scenario } = await req.json()

    const systemPrompt = `당신은 자폐 스펙트럼 사용자를 위한 소셜 지원 웹 애플리케이션의 AI 도우미입니다. 
    사용자가 선택한 시나리오는 "${scenario || "일반 대화"}"입니다. 
    사용자의 메시지에 공감하고 적절한 사회적 상호작용을 모델링하는 응답을 제공하세요.
    응답은 두 부분으로 나누어 주세요:
    1. 자연스러운 대화 응답
    2. "피드백:" 접두사로 시작하는 사용자의 의사소통에 대한 건설적인 피드백`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: message,
    })

    // 응답과 피드백 분리
    let response = text
    let feedback = ""

    if (text.includes("피드백:")) {
      const parts = text.split("피드백:")
      response = parts[0].trim()
      feedback = "피드백:" + parts[1].trim()
    }

    return Response.json({ response, feedback })
  } catch (error) {
    console.error("Error in chat API:", error)
    return Response.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
