import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kia.com"),
  title: "이진우 | 기아 자동차 강남대 대리점 대표",
  description:
    "기아 자동차 강남대 대리점 대표 이진우입니다. 차량 상담 및 시승 예약을 도와드립니다.",
  openGraph: {
    title: "이진우 | 기아 강남대 대리점 대표",
    description: "기아 자동차 강남대 대리점 대표 명함",
    type: "profile",
    locale: "ko_KR",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "이진우 | 기아 강남대",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${geist.variable} antialiased`}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body
        className="min-h-dvh bg-gray-100"
        style={{
          fontFamily:
            "'Pretendard Variable', var(--font-geist-sans), sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  )
}
