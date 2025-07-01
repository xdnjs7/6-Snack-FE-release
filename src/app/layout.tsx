import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import "./globals.css";

const suit = localFont({
  src: "../assets/fonts/suit_variable.woff2",
  weight: "100 900",
  variable: "--font-suit",
});

export const metadata: Metadata = {
  title: "간식 대장 스낵",
  description: "간편하게 간식을 주문하세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${suit.variable}`}>
        {/* Providers 추가하기 */}
        {/* Header, Footer 추가 (필요하다면) */}
        <main>{children}</main>
      </body>
    </html>
  );
}
