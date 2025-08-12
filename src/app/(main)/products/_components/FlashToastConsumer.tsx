"use client";

import { useEffect, useRef, useState } from "react";
import { useFlashToast } from "@/stores/flashToast";
import Toast from "@/components/common/Toast";
import type { TToastVariant } from "@/types/toast.types";

export default function FlashToastConsumer() {
  const consume = useFlashToast((s) => s.consume);

  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<{ text: string; variant: TToastVariant } | null>(null);
  const timerRef = useRef<number | null>(null);

  // 1) 마운트 시 딱 한 번만 consume
  useEffect(() => {
    const { message, variant } = consume();
    if (message) {
      setPayload({ text: message, variant: variant ?? "success" });
      setOpen(true);
    }
    // consume을 deps에 넣지 말 것! (StrictMode에서 재실행 방지)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) 열렸을 때만 타이머로 닫기
  useEffect(() => {
    if (!open) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(false);
      setPayload(null);
    }, 3000);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [open]);

  if (!open || !payload) return null;

  return <Toast text={payload.text} variant={payload.variant} isVisible />;
}
