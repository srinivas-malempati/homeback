"use client";
import React from "react";
import { AIState } from "../types";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-navy-2 border border-white/8 rounded-[18px] mb-3.5 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function GoldBtn({ children, onClick, disabled = false }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200
        ${disabled ? "bg-gold/30 text-navy/50 cursor-not-allowed" : "bg-gradient-to-br from-gold to-gold-l text-navy shadow-lg cursor-pointer active:scale-[.98]"}`}>
      {children}
    </button>
  );
}

export function OutlineBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className="w-full py-3.5 bg-white/5 border border-white/10 text-text-2 rounded-xl text-sm font-semibold cursor-pointer hover:bg-white/10 transition-all">
      {children}
    </button>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold text-text-4 uppercase tracking-[.07em]">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "bg-white/5 border-[1.5px] border-white/10 rounded-[10px] px-3 py-2.5 text-text text-[13px] font-medium outline-none focus:border-gold transition-colors w-full";

export function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <Field label={label}><input className={inputCls} {...props} /></Field>;
}

export function Select({ label, options, ...props }: { label: string; options: Array<string | { value: string; label: string }> } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Field label={label}>
      <select className={`${inputCls} cursor-pointer appearance-none`} {...props}>
        {options.map(o => {
          const v = typeof o === "string" ? o : o.value;
          const l = typeof o === "string" ? o : o.label;
          return <option key={v} value={v} className="bg-navy-3">{l}</option>;
        })}
      </select>
    </Field>
  );
}

const alertMap: Record<string, string> = {
  gold:  "bg-gold/8  border-gold/22  text-text-2",
  red:   "bg-red/8   border-red/22   text-text-2",
  green: "bg-green/8 border-green/22 text-text-2",
  blue:  "bg-blue/8  border-blue/22  text-text-2",
};

export function Alert({ type = "gold", icon, children }: { type?: string; icon: string; children: React.ReactNode }) {
  return (
    <div className={`flex gap-2.5 p-3.5 rounded-xl mb-3.5 border text-[13px] leading-relaxed ${alertMap[type]}`}>
      <span className="text-[17px] shrink-0 mt-0.5">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

export function KnowRow({ q, a, aColor = "#E8B96A" }: { q: string; a: string; aColor?: string }) {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-white/5 gap-3 last:border-b-0">
      <div className="text-[13px] font-medium text-text-2 flex-1">{q}</div>
      <div className="text-[13px] font-bold text-right shrink-0" style={{ color: aColor }}>{a}</div>
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-2.5 text-[10px] font-bold text-text-4 uppercase tracking-[.09em]">
      {children}
      <div className="flex-1 h-px bg-white/7" />
    </div>
  );
}

export function AdvisorHeader({ icon, title, iconBg, iconBorder }: { icon: string; title: string; iconBg: string; iconBorder: string }) {
  return (
    <div className="px-4 pt-4 pb-0">
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-11 h-11 rounded-[13px] flex items-center justify-center text-xl shrink-0 border ${iconBg} ${iconBorder}`}>{icon}</div>
        <div>
          <div className="font-bold text-[17px] text-text" style={{ fontFamily: "Georgia,serif" }}>{title}</div>
          <span className="text-[10px] font-bold bg-blue/15 text-blue px-1.5 py-0.5 rounded uppercase tracking-[.04em]">✦ AI Powered</span>
        </div>
      </div>
    </div>
  );
}

export function AIResult({ loading, result, error }: AIState) {
  if (!loading && !result && !error) return null;
  return (
    <div className="px-4 pb-4">
      {loading && (
        <div className="flex items-center gap-2.5 p-4 bg-blue/6 border border-blue/15 rounded-xl text-[13px] text-text-3">
          <span className="text-lg animate-pulse">⏳</span>
          <span>HomeBack AI is analyzing your details...</span>
        </div>
      )}
      {(result || error) && (
        <div className="bg-navy/70 border border-gold/25 rounded-[14px] overflow-hidden">
          <div className="px-4 py-3 bg-gold/7 border-b border-gold/20 flex items-center gap-2">
            <span>🤖</span>
            <span className="text-xs font-bold text-gold-l">HomeBack AI Advisor</span>
          </div>
          <div className={`p-4 text-[13px] leading-[1.75] whitespace-pre-wrap ${error ? "text-red" : "text-[#C8D0E0]"}`}>
            {error || result}
          </div>
        </div>
      )}
    </div>
  );
}
