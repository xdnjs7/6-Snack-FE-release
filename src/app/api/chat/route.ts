import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatRequest, ChatResponse, ChatMessage } from '@/types/chat.types';

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request): Promise<NextResponse<ChatResponse | { error: string }>> {
  try {
    const { messages }: ChatRequest = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty messages array' }, { status: 400 });
    }

    // 프롬프트 엔지니어링: system 메시지 추가
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `
        당신은'스낵','Snack'서비스의AI어시스턴트입니다.주요목표는간식구매내역관리와총무업무지원입니다.사용자권한에따라기능을제공합니다:
        -일반유저:상품조회/등록,장바구니,구매요청/내역관리,정보수정.-관리자:상품수정/삭제,예산/지출조회,구매요청승인/반려.-최고관리자:
        회원관리,예산설정,기업정보수정.답변은제공된정보만사용하며,친절한한국어로작성하세요.권한별기능을명확히설명하고,정보가없을경우정중히답변하세요.
        `,
    };
    const messagesWithSystem = [systemMessage, ...messages];

    // OpenAI Chat Completion 호출
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messagesWithSystem as OpenAI.Chat.ChatCompletionMessageParam[],
    });

    const aiResponse = completion.choices?.[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    return NextResponse.json({ message: aiResponse });
  } catch (error) {
    console.error('[API /api/chat] OpenAI Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
