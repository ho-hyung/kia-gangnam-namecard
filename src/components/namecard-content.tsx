"use client"

import { UserPlus, Share2 } from "lucide-react"
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

async function handleShare() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${owner.name} | ${owner.company}`,
        text: `${owner.company} ${owner.position} ${owner.name}`,
        url: owner.namecardUrl,
      })
    } catch {
      // User cancelled
    }
  } else {
    await navigator.clipboard.writeText(owner.namecardUrl)
  }
}

export function NamecardContent() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gray-100 px-5 py-6">
      {/* ── Business Card ── */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        {/* Diagonal accent line */}
        <div
          className="pointer-events-none absolute top-0 right-0 h-full w-full"
          style={{
            background:
              "linear-gradient(155deg, transparent 28%, rgba(160,140,100,0.12) 28.5%, rgba(160,140,100,0.06) 29.5%, transparent 30%)",
          }}
        />

        {/* Card content */}
        <div className="relative z-10 px-7 py-8">
          {/* Name */}
          <h1 className="text-3xl font-bold tracking-wide text-black">
            {owner.name}
          </h1>

          {/* Contact info block */}
          <div className="mt-7 space-y-1">
            <p className="text-[15px] font-medium text-black">강남대대리점</p>
            <p className="text-[15px] font-bold text-black">
              {owner.position}
            </p>

            {/* M, T, F, E format */}
            <div className="mt-3 space-y-1.5 pt-1">
              <a
                href={`tel:${owner.mobile}`}
                className="flex items-baseline gap-3 text-[15px] active:text-red-600"
              >
                <span className="w-3.5 font-bold text-black/60">M</span>
                <span className="font-bold tracking-wide text-black">
                  {owner.mobile.replace(/-/g, ".")}
                </span>
              </a>
              <a
                href={`tel:${owner.phone}`}
                className="flex items-baseline gap-3 text-[15px] active:text-red-600"
              >
                <span className="w-3.5 font-bold text-black/60">T</span>
                <span className="tracking-wide text-black">
                  {owner.phone.replace(/-/g, ".")}
                </span>
              </a>
              <div className="flex items-baseline gap-3 text-[15px]">
                <span className="w-3.5 font-bold text-black/60">F</span>
                <span className="tracking-wide text-black">
                  {owner.fax.replace(/-/g, ".")}
                </span>
              </div>
              <a
                href={`mailto:${owner.email}`}
                className="flex items-baseline gap-3 text-[15px] active:text-red-600"
              >
                <span className="w-3.5 font-bold text-black/60">E</span>
                <span className="tracking-wide text-black">
                  {owner.email}
                </span>
              </a>
            </div>
          </div>

          {/* Bottom — Kia Corporation + Address + Logo */}
          <div className="mt-7 border-t border-gray-200 pt-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] font-bold tracking-wide text-black">
                  Kia Corporation
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-black/70">
                  {owner.zipcode} {owner.address}
                  <br />
                  ({owner.addressSub})
                </p>
              </div>
              <KiaLogo color="#000000" width={48} className="mt-0.5 shrink-0 opacity-40" />
            </div>
            <p className="mt-2 text-[12px] font-medium text-black/70">{owner.website}</p>
          </div>
        </div>
      </div>

      {/* ── Greeting + Hours ── */}
      <div className="mt-4 w-full max-w-sm rounded-lg bg-white px-6 py-4 shadow-sm">
        <p className="text-center text-[13px] leading-relaxed text-black/80">
          &ldquo;편하게 연락주세요, 최적의 조건을 제안드리겠습니다.&rdquo;
        </p>
        <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[12px] text-black/60">
          <span>월~금 08:30-20:00</span>
          <span className="text-black/30">|</span>
          <span>주말 09:00-18:00</span>
        </div>
      </div>

      {/* ── Save / Share ── */}
      <div className="mt-3 grid w-full max-w-sm grid-cols-2 gap-2.5">
        <button
          onClick={generateVCard}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-white py-3 text-sm font-semibold text-black shadow-sm transition-colors active:bg-gray-50"
        >
          <UserPlus className="h-3.5 w-3.5" />
          연락처 저장
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-white py-3 text-sm font-semibold text-black shadow-sm transition-colors active:bg-gray-50"
        >
          <Share2 className="h-3.5 w-3.5" />
          명함 공유
        </button>
      </div>
    </div>
  )
}
