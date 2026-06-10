"use client";
import { useState } from "react";
import { GoldBtn, OutlineBtn, Alert, SectionLabel } from "../components/ui";

const GROUPS = [
  { label: "12 months before", items: [
    { id:"c1",  text:"List your home for sale immediately",                        tag:"Critical",     tc:"#F05A5A" },
    { id:"c2",  text:"Hire a cross-border CPA (US + India tax)",                   tag:"Critical",     tc:"#F05A5A" },
    { id:"c3",  text:"Start job search in India",                                  tag:"Critical",     tc:"#F05A5A" },
    { id:"c4",  text:"Decide which city to settle in India",                       tag:"Soon",         tc:"#F0A030" },
  ]},
  { label: "6 months before", items: [
    { id:"c5",  text:"Open NRE account (tax-free repatriation)",                   tag:"Required",     tc:"#F05A5A" },
    { id:"c6",  text:"Open NRO account (Indian-sourced income)",                   tag:"Required",     tc:"#F05A5A" },
    { id:"c7",  text:"Decide 401k strategy with your CPA",                         tag:"High Impact",  tc:"#4A9EE8" },
    { id:"c8",  text:"Research children's schools in India",                       tag:"Family",       tc:"#F0A030" },
    { id:"c9",  text:"Get 3 car quotes (CarMax, Carvana, private)",               tag:"Soon",         tc:"#F0A030" },
  ]},
  { label: "3 months before", items: [
    { id:"c10", text:"Book international shipping container",                      tag:"Book Early",   tc:"#F05A5A" },
    { id:"c11", text:"Sort belongings: ship vs. sell vs. donate",                  tag:"Soon",         tc:"#F0A030" },
    { id:"c12", text:"Get Indian health insurance (US cover ends on landing)",     tag:"Critical",     tc:"#F05A5A" },
    { id:"c13", text:"Book flights — check family baggage allowance",              tag:"Soon",         tc:"#F0A030" },
    { id:"c14", text:"Liquidate US stocks strategically",                          tag:"Tax Timing",   tc:"#4A9EE8" },
  ]},
  { label: "Final month", items: [
    { id:"c15", text:"Cancel all US subscriptions",                                tag:"Admin",        tc:"#7A8499" },
    { id:"c16", text:"Set up USPS mail forwarding",                                tag:"Admin",        tc:"#7A8499" },
    { id:"c17", text:"Notify IRS of new foreign address",                          tag:"Legal",        tc:"#4A9EE8" },
    { id:"c18", text:"Carry all original documents in hand luggage",               tag:"Don't forget", tc:"#F05A5A" },
    { id:"c19", text:"Sell your car (keep it until last week)",                    tag:"Last Step",    tc:"#F0A030" },
  ]},
  { label: "After landing in India", items: [
    { id:"c20", text:"Reactivate Aadhaar and PAN card",                            tag:"Week 1",       tc:"#F05A5A" },
    { id:"c21", text:"Convert NRE/NRO to resident savings account",                tag:"Required",     tc:"#F05A5A" },
    { id:"c22", text:"File dual-status US tax return (year of departure)",         tag:"By Apr 15",    tc:"#4A9EE8" },
    { id:"c23", text:"Transfer or renew Indian driving license",                   tag:"Month 1",      tc:"#F0A030" },
  ]},
];

export default function Checklist({ onRestart }: { onRestart: () => void }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setChecked(c => ({ ...c, [id]: !c[id] }));
  const total = GROUPS.reduce((a, g) => a + g.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="pb-10">
      <div className="px-4 pt-7 pb-0">
        <h2 className="text-[32px] font-bold leading-[1.1] mb-2.5" style={{ fontFamily: "Georgia,serif" }}>
          ✅ Your Master<br /><span className="text-green">Move Checklist</span>
        </h2>
        <p className="text-[13px] text-text-3 leading-relaxed mb-5">Every step sorted by timing. Tap to mark complete.</p>
        <div className="bg-navy-2 border border-white/8 rounded-[14px] px-4 py-3.5 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-[13px] font-semibold text-text-2">{done} of {total} completed</span>
            <span className="text-[13px] font-bold text-green">{pct}%</span>
          </div>
          <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-green to-[#6FE8B0] transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
      {GROUPS.map(g => (
        <div key={g.label}>
          <div className="px-4"><SectionLabel>{g.label}</SectionLabel></div>
          <div className="px-4 flex flex-col gap-2 mb-3.5">
            {g.items.map(item => (
              <div key={item.id} onClick={() => toggle(item.id)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-[12px] border cursor-pointer transition-all
                  ${checked[item.id] ? "bg-green/5 border-green/15" : "bg-white/3 border-white/7 active:bg-white/6"}`}>
                <div className={`w-5 h-5 rounded-[6px] border-2 shrink-0 flex items-center justify-center text-[11px] font-bold text-navy transition-all
                  ${checked[item.id] ? "bg-green border-green" : "border-text-4"}`}>
                  {checked[item.id] ? "✓" : ""}
                </div>
                <div className={`flex-1 text-[13px] font-medium leading-snug transition-colors ${checked[item.id] ? "text-text-4 line-through" : "text-text-2"}`}>
                  {item.text}
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 uppercase tracking-[.04em]"
                  style={{ color: item.tc, background: `${item.tc}18` }}>{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="px-4 pt-2">
        <Alert type="gold" icon="🎉">
          <strong className="text-gold-l">You&apos;re almost home.</strong> This covers everything a moving NRI family needs. Tap any step in the header to revisit the advisors anytime.
        </Alert>
        <OutlineBtn onClick={onRestart}>← Start Over / Review Advisors</OutlineBtn>
      </div>
    </div>
  );
}
