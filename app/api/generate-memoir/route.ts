import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { image, tags, description } = await req.json()

    // 실제 구현에서는 이미지를 분석하거나 처리하는 로직이 필요할 수 있습니다

    // AI를 사용하여 회고록 텍스트 생성
    const prompt = `
다음 정보를 바탕으로 개인 회고록의 한 페이지를 작성해주세요:

이미지 설명: ${image || "이미지 없음"}
태그: ${tags.join(", ")}
간단한 설명: ${description}

회고록은 1인칭 시점으로, 감성적이고 자세한 묘사가 있는 5개 문단으로 작성해주세요.
각 문단은 3-4문장으로 구성하고, 과거의 추억을 회상하는 느낌으로 작성해주세요.
`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "당신은 감성적이고 문학적인 회고록을 작성하는 작가입니다. 사용자가 제공한 정보를 바탕으로 아름답고 감성적인 회고록을 작성해주세요. 한국어로 작성해주세요.",
    })

    return NextResponse.json({ content: text })
  } catch (error) {
    console.error("Error generating memoir:", error)
    return NextResponse.json({ error: "회고록 생성 중 오류가 발생했습니다." }, { status: 500 })
  }
}
