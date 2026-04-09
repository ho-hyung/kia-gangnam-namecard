import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "이진우 | 기아 자동차 강남대 대리점 대표"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  const fontData = await fetch(
    "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.subset.woff"
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#05141F",
          fontFamily: "Pretendard",
        }}
      >
        {/* KIA text logo */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.15em",
            marginBottom: 32,
          }}
        >
          KIA
        </div>

        {/* Red Line */}
        <div
          style={{
            width: 60,
            height: 3,
            background: "#BB162B",
            marginBottom: 36,
            display: "flex",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.05em",
            marginBottom: 12,
          }}
        >
          이진우
        </div>

        {/* Position */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 8,
          }}
        >
          대표
        </div>

        {/* Company */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          기아 자동차 강남대 대리점
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#BB162B",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Pretendard",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  )
}
