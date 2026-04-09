import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "이진우 | 기아 자동차 강남대 대리점 대표"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
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
          fontFamily: "sans-serif",
        }}
      >
        {/* KIA Logo */}
        <svg
          viewBox="0 0 102.6 51.3"
          width="160"
          height="80"
          style={{ marginBottom: 32 }}
        >
          <path
            fill="#ffffff"
            d="M59.1,35.2c0,0.2,0.1,0.3,0.2,0.3c0.1,0,0.2,0,0.2-0.1L91,14.9c0.6-0.4,1.1-0.6,1.8-0.6h6.9
            c1.1,0,1.8,0.7,1.8,1.8v13.2c0,1.6-0.4,2.5-1.8,3.4l-8.4,5c-0.1,0.1-0.2,0.1-0.3,0.1c-0.1,0-0.2-0.1-0.2-0.4V22
            c0-0.2-0.1-0.3-0.2-0.3s-0.2,0-0.2,0.1l-23,15c-0.6,0.4-1.2,0.5-1.8,0.5H50.4c-1.1,0-1.8-0.7-1.8-1.8v-19c0-0.1-0.1-0.3-0.2-0.3
            c-0.1,0-0.2,0-0.2,0.1L33,25.5c-0.2,0.1-0.2,0.2-0.2,0.2c0,0.1,0,0.1,0.1,0.2l10.8,10.8c0.1,0.1,0.2,0.3,0.2,0.4
            c0,0.1-0.2,0.2-0.3,0.2h-9.8c-0.8,0-1.4-0.1-1.8-0.5l-6.6-6.6c-0.1-0.1-0.1-0.1-0.2-0.1s-0.1,0-0.2,0.1l-11,6.6
            c-0.7,0.4-1.1,0.5-1.8,0.5H2.3c-1.1,0-1.8-0.7-1.8-1.8v-13c0-1.6,0.4-2.5,1.8-3.4l8.4-5.1c0.1-0.1,0.2-0.1,0.2-0.1
            c0.1,0,0.2,0.1,0.2,0.4v17.3c0,0.2,0.1,0.3,0.2,0.3c0.1,0,0.2,0,0.3-0.1l28.5-17.2c0.7-0.4,1.1-0.5,1.9-0.5h15.4
            c1.1,0,1.8,0.7,1.8,1.8v19.3H59.1z"
          />
        </svg>

        {/* Red Line */}
        <div
          style={{
            width: 60,
            height: 3,
            background: "#BB162B",
            marginBottom: 36,
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
          }}
        />
      </div>
    ),
    { ...size }
  )
}
