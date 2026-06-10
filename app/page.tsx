"use client";
import { useState, useRef } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeAdvisor from "./screens/HomeAdvisor";
import FinanceAdvisor from "./screens/FinanceAdvisor";
import ShipAdvisor from "./screens/ShipAdvisor";
import CarAdvisor from "./screens/CarAdvisor";
import Checklist from "./screens/Checklist";

type Screen = "welcome" | "home" | "finance" | "ship" | "car" | "checklist";
const SCREENS: Screen[] = ["welcome","home","finance","ship","car","checklist"];
const MODS = [
  { id:"home"    as const, emoji:"🏡", color:"#E8B96A" },
  { id:"finance" as const, emoji:"💰", color:"#2ECC8A" },
  { id:"ship"    as const, emoji:"📦", color:"#4A9EE8" },
  { id:"car"     as const, emoji:"🚗", color:"#F0A030" },
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const topRef = useRef<HTMLDivElement>(null);
  const go = (s: Screen) => { setScreen(s); setTimeout(() => topRef.current?.scrollIntoView({ behavior:"smooth" }), 50); };
  const idx = SCREENS.indexOf(screen);

  return (
    <div className="min-h-screen bg-navy text-text overflow-x-hidden relative">
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 50% at 10% 0%,rgba(201,151,58,0.08) 0%,transparent 55%),radial-gradient(ellipse 60% 60% at 90% 100%,rgba(74,158,232,0.05) 0%,transparent 55%)"
      }} />
      <div ref={topRef} />

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3.5 border-b border-gold/12"
        style={{ background:"rgba(9,17,31,0.93)", backdropFilter:"blur(20px)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[17px]"
            style={{ background:"linear-gradient(135deg,#C9973A,#E8B96A)", boxShadow:"0 4px 14px rgba(201,151,58,0.3)" }}>🏠</div>
          <span className="text-[21px] font-bold text-text" style={{ fontFamily:"Georgia,serif" }}>
            Home<span className="text-gold-l">Back</span>
          </span>
        </div>
        {screen !== "welcome" ? (
          <div className="flex items-center gap-2">
            {MODS.map((m, i) => {
              const isActive = screen === m.id;
              const isDone = idx > i + 1 || screen === "checklist";
              return (
                <button key={m.id} onClick={() => go(m.id)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[13px] cursor-pointer transition-all duration-300 border-2"
                  style={{
                    background: isDone ? "#2ECC8A" : isActive ? m.color : "rgba(255,255,255,0.06)",
                    borderColor: isDone ? "#2ECC8A" : isActive ? m.color : "rgba(255,255,255,0.1)",
                    boxShadow: isActive ? `0 0 10px ${m.color}40` : "none",
                  }}>
                  {isDone ? "✓" : m.emoji}
                </button>
              );
            })}
          </div>
        ) : (
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-[.06em] text-gold-l"
            style={{ background:"rgba(201,151,58,0.12)", border:"1px solid rgba(201,151,58,0.28)" }}>US Exit</span>
        )}
      </header>

      {/* Screens */}
      <div className="relative z-10">
        {screen === "welcome"   && <WelcomeScreen  onStart={()    => go("home")} />}
        {screen === "home"      && <HomeAdvisor    onNext={()     => go("finance")} />}
        {screen === "finance"   && <FinanceAdvisor onNext={()     => go("ship")} />}
        {screen === "ship"      && <ShipAdvisor    onNext={()     => go("car")} />}
        {screen === "car"       && <CarAdvisor     onNext={()     => go("checklist")} />}
        {screen === "checklist" && <Checklist      onRestart={()  => go("welcome")} />}
      </div>
    </div>
  );
}
