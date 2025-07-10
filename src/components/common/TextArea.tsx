import { useState, useEffect } from "react";
import { TTextAreaProps } from "@/types/textArea.types";

const TextArea = ({ placeholder, value, onChange }: TTextAreaProps) => {
  const [hasText, setHasText] = useState(false);

  useEffect(() => {
    setHasText((value ?? "").trim().length > 0);
  }, [value]);

  return (
    <textarea
      placeholder={placeholder || "메시지를 입력해주세요."}
      value={value}
      onChange={onChange}
      className={`w-[570px] h-40 p-6 bg-white rounded-sm text-base text-neutral-800 resize-none placeholder:text-neutral-400
        ${hasText ? "border-black" : "border-neutral-300"} border outline-none`}
    />
  );
};

export default TextArea;
