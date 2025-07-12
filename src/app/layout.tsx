import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import "./globals.css";
import DevNavBar from "@/components/preview/DevNavBar";
import { TChildrenProps } from "@/types/children.types";

const suit = localFont({
  src: "../assets/fonts/suit_variable.woff2",
  weight: "100 900",
  variable: "--font-suit",
});

export const metadata: Metadata = {
  title: "스낵(Snack)",
  description: "여러 플랫폼에서 구매한 간식 내역을 한곳에 모아 관리할 수 있는 원스톱 간식 관리 서비스",
};

export default function RootLayout({ children }: TChildrenProps) {
  return (
    <html lang="ko">
      <body className={`${suit.variable}`}>
        {/* Providers 추가하기 */}
        {/* Header, Footer 추가 (필요하다면) */}
        {/* 개발용 네비게이션 바 작업완료 후 삭제*/}
        <DevNavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
