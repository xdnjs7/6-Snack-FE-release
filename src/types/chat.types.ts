// 챗봇에서 사용하는 공통 타입 정의
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  // 메시지 식별 및 메타데이터 (UI 용도)
  id?: string;
  createdAt?: string; // ISO 문자열
  error?: boolean; // 에러 메시지 여부 (재전송 안내 등)
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  message: string;
}
