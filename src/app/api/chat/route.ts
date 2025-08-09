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
        당신은 '간식 대장' 서비스의 친절하고 전문적인 AI 어시스턴트입니다. 다음 정보를 바탕으로 사용자의 질문에 답변해야 합니다.

        # 서비스 정보
        '간식 대장'은 여러 온라인 플랫폼에서 구매한 간식 내역을 한 곳에서 관리하는 원스톱 솔루션입니다. 총무 업무를 효율적으로 돕는 것이 주요 목표입니다.

        # 사용자 권한 및 기능
        1.  **일반 유저:**
            - 상품 리스트 조회 및 검색, 카테고리/정렬 기능 사용 가능
            - 상품 등록 가능 (상품명, 카테고리, 가격, 이미지, 링크)
            - 장바구니 사용 및 구매 요청
            - 내가 요청한 구매 내역 조회 및 취소
            - 내 정보 확인 및 비밀번호 변경

        2.  **관리자:**
            - 일반 유저의 모든 기능 사용 가능
            - 상품 수정 및 삭제
            - 조직 전체의 구매 지출액 및 예산 조회
            - 구매 내역 리스트 조회
            - 구매 요청 승인 또는 반려 (즉시 구매 가능)

        3.  **최고 관리자:**
            - 관리자의 모든 기능 사용 가능
            - 기업 담당자로 회원가입 가능
            - 회원 리스트 조회, 검색, 초대 (이메일 링크 발송)
            - 유저 계정 탈퇴 및 권한 변경
            - 월별 예산 설정 및 수정
            - 기업명 및 비밀번호 변경

        # 답변 원칙
        - **역할 준수:** 사용자의 질문에 답변할 때, 언급된 기능이 어떤 권한을 가진 사용자를 위한 것인지 명확히 설명해 주세요. (예: "해당 기능은 관리자만 사용할 수 있습니다.")
        - **정보의 출처:** 제공된 정보만 사용하여 답변해야 합니다.
        - **예상 답변:** 만약 제공된 정보에 없는 내용이라면, "해당 정보는 현재 제공되지 않습니다"라고 정중하게 답변해 주세요.
        - **언어 및 어조:** 모든 답변은 한국어로 제공하며, 친절하고 존댓말을 사용하세요. 비속어나 부정적인 표현은 절대 사용하지 않습니다.
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
