"use client"

import { useState, useCallback } from "react"
import { UserPlus, Share2, Sun, Moon, Check } from "lucide-react"
import { KiaLogo } from "@/components/kia-logo"
import { owner } from "@/data/owner"

function generateVCard() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${owner.name}`,
    `ORG:${owner.company}`,
    `TITLE:${owner.position}`,
    `TEL;TYPE=WORK:${owner.phone}`,
    `TEL;TYPE=CELL:${owner.mobile}`,
    `EMAIL:${owner.email}`,
    `ADR;TYPE=WORK:;;${owner.address};;;;`,
    "END:VCARD",
  ].join("\n")

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${owner.name}_기아_강남대대리점.vcf`
  link.click()
  URL.revokeObjectURL(url)
}

async function copyToClipboard(url: string) {
  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement("textarea")
    textarea.value = url
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
    return true
  }
}

const theme = {
  light: {
    bg: "bg-gray-100",
    card: "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]",
    diagonal:
      "linear-gradient(155deg, transparent 28%, rgba(160,140,100,0.12) 28.5%, rgba(160,140,100,0.06) 29.5%, transparent 30%)",
    name: "text-black",
    primary: "text-black",
    label: "text-black/60",
    secondary: "text-black/70",
    divider: "border-gray-200",
    logoColor: "#000000",
    logoOpacity: "opacity-40",
    sub: "bg-white shadow-sm",
    subText: "text-black/80",
    subMuted: "text-black/60",
    subSep: "text-black/30",
    btn: "bg-white text-black shadow-sm active:bg-gray-50",
    toggleBtn: "bg-white/80 text-black/60 hover:text-black",
  },
  dark: {
    bg: "bg-neutral-900",
    card: "bg-[#1a1a1a] shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
    diagonal:
      "linear-gradient(155deg, transparent 28%, rgba(180,160,120,0.15) 28.5%, rgba(180,160,120,0.08) 29.5%, transparent 30%)",
    name: "text-white",
    primary: "text-white",
    label: "text-white/50",
    secondary: "text-white/60",
    divider: "border-neutral-700/50",
    logoColor: "#ffffff",
    logoOpacity: "opacity-30",
    sub: "bg-[#1a1a1a]/60",
    subText: "text-neutral-300",
    subMuted: "text-neutral-400",
    subSep: "text-neutral-700",
    btn: "bg-[#1a1a1a]/60 text-neutral-300 active:bg-[#2a2a2a]",
    toggleBtn: "bg-white/10 text-white/50 hover:text-white",
  },
} as const

export function NamecardContent() {
  const [mode, setMode] = useState<"light" | "dark">("light")
  const [copied, setCopied] = useState(false)
  const t = theme[mode]

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${owner.name} | ${owner.company}`,
          text: `${owner.company} ${owner.position} ${owner.name}`,
          url: owner.namecardUrl,
        })
        return
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }
    const success = await copyToClipboard(owner.namecardUrl)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [])

  return (
    <div
      className={`safe-area flex min-h-dvh flex-col items-center justify-center px-5 py-6 transition-colors duration-300 select-none ${t.bg}`}
    >
      {/* ── Business Card ── */}
      <div
        className={`relative w-full max-w-sm overflow-hidden rounded-lg transition-colors duration-300 ${t.card}`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={`absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${t.toggleBtn}`}
          aria-label="테마 변경"
        >
          {mode === "light" ? (
            <>
              <Moon className="h-3 w-3" />
              Dark
            </>
          ) : (
            <>
              <Sun className="h-3 w-3" />
              Light
            </>
          )}
        </button>

        {/* Diagonal accent line */}
        <div
          className="pointer-events-none absolute top-0 right-0 h-full w-full"
          style={{ background: t.diagonal }}
        />

        {/* Card content */}
        <div className="relative z-10 px-7 py-8">
          {/* Name */}
          <h1
            className={`text-3xl font-bold tracking-wide transition-colors duration-300 ${t.name}`}
          >
            {owner.name}
          </h1>

          {/* Contact info block */}
          <div className="mt-7 space-y-1">
            <p
              className={`text-[15px] font-medium transition-colors duration-300 ${t.primary}`}
            >
              강남대대리점
            </p>
            <p
              className={`text-[15px] font-bold transition-colors duration-300 ${t.primary}`}
            >
              {owner.position}
            </p>

            {/* M, T, F, E format */}
            <div className="mt-3 space-y-0.5 pt-1 select-text">
              <a
                href={`tel:${owner.mobile}`}
                className="-mx-2 flex items-baseline gap-3 rounded-lg px-2 py-1.5 text-[15px] active:bg-black/5 dark:active:bg-white/5"
              >
                <span
                  className={`w-3.5 font-bold transition-colors duration-300 ${t.label}`}
                >
                  M
                </span>
                <span
                  className={`font-bold tracking-wide transition-colors duration-300 ${t.primary}`}
                >
                  {owner.mobile.replace(/-/g, ".")}
                </span>
              </a>
              <a
                href={`tel:${owner.phone}`}
                className="-mx-2 flex items-baseline gap-3 rounded-lg px-2 py-1.5 text-[15px] active:bg-black/5 dark:active:bg-white/5"
              >
                <span
                  className={`w-3.5 font-bold transition-colors duration-300 ${t.label}`}
                >
                  T
                </span>
                <span
                  className={`tracking-wide transition-colors duration-300 ${t.primary}`}
                >
                  {owner.phone.replace(/-/g, ".")}
                </span>
              </a>
              <div className="-mx-2 flex items-baseline gap-3 rounded-lg px-2 py-1.5 text-[15px]">
                <span
                  className={`w-3.5 font-bold transition-colors duration-300 ${t.label}`}
                >
                  F
                </span>
                <span
                  className={`tracking-wide transition-colors duration-300 ${t.primary}`}
                >
                  {owner.fax.replace(/-/g, ".")}
                </span>
              </div>
              <a
                href={`mailto:${owner.email}`}
                className="-mx-2 flex items-baseline gap-3 rounded-lg px-2 py-1.5 text-[15px] active:bg-black/5 dark:active:bg-white/5"
              >
                <span
                  className={`w-3.5 font-bold transition-colors duration-300 ${t.label}`}
                >
                  E
                </span>
                <span
                  className={`tracking-wide transition-colors duration-300 ${t.primary}`}
                >
                  {owner.email}
                </span>
              </a>
            </div>
          </div>

          {/* Bottom — Kia Corporation + Address + Logo */}
          <div
            className={`mt-7 border-t pt-5 transition-colors duration-300 ${t.divider}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className={`text-[13px] font-bold tracking-wide transition-colors duration-300 ${t.primary}`}
                >
                  Kia Corporation
                </p>
                <p
                  className={`mt-1.5 text-[12px] leading-relaxed transition-colors duration-300 ${t.secondary}`}
                >
                  {owner.zipcode} {owner.address}
                  <br />
                  ({owner.addressSub})
                </p>
              </div>
              <KiaLogo
                color={t.logoColor}
                width={48}
                className={`mt-0.5 shrink-0 ${t.logoOpacity}`}
              />
            </div>
            <p
              className={`mt-2 text-[12px] font-medium transition-colors duration-300 ${t.secondary}`}
            >
              {owner.website}
            </p>
          </div>
        </div>
      </div>

      {/* ── Greeting + Hours ── */}
      <div
        className={`mt-4 w-full max-w-sm rounded-lg px-6 py-4 transition-colors duration-300 ${t.sub}`}
      >
        <p
          className={`text-center text-[13px] leading-relaxed transition-colors duration-300 ${t.subText}`}
        >
          &ldquo;편하게 연락주세요, 최적의 조건을 제안드리겠습니다.&rdquo;
        </p>
        <div
          className={`mt-2.5 flex items-center justify-center gap-1.5 text-[12px] transition-colors duration-300 ${t.subMuted}`}
        >
          <span>월~금 08:30-20:00</span>
          <span className={t.subSep}>|</span>
          <span>주말 09:00-18:00</span>
        </div>
      </div>

      {/* ── Save / Share ── */}
      <div className="mt-3 grid w-full max-w-sm grid-cols-2 gap-2.5">
        <button
          onClick={generateVCard}
          className={`flex min-h-[48px] items-center justify-center gap-1.5 rounded-lg text-sm font-semibold transition-colors duration-300 ${t.btn}`}
        >
          <UserPlus className="h-4 w-4" />
          연락처 저장
        </button>
        <button
          onClick={handleShare}
          className={`flex min-h-[48px] items-center justify-center gap-1.5 rounded-lg text-sm font-semibold transition-colors duration-300 ${t.btn}`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              링크 복사됨
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              명함 공유
            </>
          )}
        </button>
      </div>
    </div>
  )
}
