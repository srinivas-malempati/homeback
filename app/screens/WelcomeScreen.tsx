"use client";
import { useEffect, useState } from "react";
import { GoldBtn } from "../components/ui";

const MODULES = [
  { id: "home",    emoji: "🏡", label: "Home",     subtitle: "Sell your US home at the best price", color: "#E8B96A" },
  { id: "finance", emoji: "💰", label: "Finances", subtitle: "401k, taxes & moving your money",      color: "#2ECC8A" },
  { id: "ship",    emoji: "📦", label: "Shipping", subtitle: "What to ship, what to sell",            color: "#4A9EE8" },
  { id: "car",     emoji: "🚗", label: "Car",      subtitle: "Sell your car for maximum value",       color: "#F0A030" },
];

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, []);
  const f = (d: number) => ({ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `opacity .6s ease ${d}s, transform .6s ease ${d}s` });

  return (
    <div className="px-4 pb-10">
      <div style={f(0.1)} className="text-center text-5xl my-9">🇮🇳</div>
      <div style={f(0.2)} className="text-center mb-5">
        <h1 className="text-[36px] font-bold leading-[1.1] tracking-tight mb-3.5" style={{ fontFamily: "Georgia,serif" }}>
          Ready to return to<br /><span className="text-gold-l">your motherland?</span>
        </h1>
        <p className="text-sm text-text-3 leading-relaxed max-w-[300px] mx-auto">
          Millions of Indians are moving back home. We&apos;re here to make sure you do it the{" "}
          <strong className="text-text-2">smartest, least costly way possible.</strong>
        </p>
      </div>
      <div style={f(0.3)} className="mb-7">
        {MODULES.map((m, i) => (
          <div key={m.id} className="flex items-center gap-3.5 px-4 py-3.5 mb-2 bg-white/3 border border-white/7 rounded-[14px]">
            <div className="w-10 h-10 rounded-[11px] flex items-center justify-center text-[19px] shrink-0 border"
              style={{ background: `${m.color}18`, borderColor: `${m.color}40` }}>{m.emoji}</div>
            <div className="flex-1">
              <div className="text-[14px] font-bold text-text mb-0.5">Step {i + 1} — {m.label}</div>
              <div className="text-[12px] text-text-3">{m.subtitle}</div>
            </div>
            <div className="text-[11px] font-bold px-2 py-1 rounded-md" style={{ color: m.color, background: `${m.color}18` }}>{i + 1}/4</div>
          </div>
        ))}
      </div>
      <div style={f(0.45)} className="bg-gradient-to-br from-gold/10 to-gold/4 border border-gold/25 rounded-2xl px-4 py-5 mb-7 text-center">
        <div className="text-xl mb-2.5">✦</div>
        <p className="text-[13px] text-text-2 leading-[1.7]">
          We&apos;ll walk you through each step —{" "}
          <strong className="text-gold-l">real numbers, real scenarios</strong>{" "}
          — so you don&apos;t lose money on the most important move of your life.
        </p>
      </div>
      <div style={f(0.55)}><GoldBtn onClick={onStart}>Let&apos;s Begin My Move Plan →</GoldBtn></div>
    </div>
  );
}
