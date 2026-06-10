"use client";
import { useState } from "react";
import { Card, GoldBtn, Select, Alert, SectionLabel, AIResult, AdvisorHeader } from "../components/ui";
import { useAdvisor } from "../hooks/useAdvisor";
import { ShipForm } from "../types";

const TILES = [
  { icon: "📦", label: "Small (LCL)",    val: "~$1,200", note: "~200 cu.ft. shared" },
  { icon: "🚢", label: "20ft container", val: "~$3,900", note: "Full 2BHK" },
  { icon: "🛳️", label: "40ft container", val: "~$6,500", note: "Full 4BHK" },
  { icon: "✈️", label: "Air freight",    val: "$8–14/kg", note: "Docs & urgent only" },
];

export default function ShipAdvisor({ onNext }: { onNext: () => void }) {
  const [form, setForm] = useState<ShipForm>({ family: "Family (3-4)", size: "3 BHK", furn: "yes", elec: "yes" });
  const { ai, analyze } = useAdvisor("ship");
  const set = (k: keyof ShipForm, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleAnalyze = () => {
    analyze(`NRI family shipping from USA to India.
Family: ${form.family}, Home size: ${form.size}
Furniture: ${form.furn === "yes" ? "Significant" : form.furn === "some" ? "Some pieces" : "IKEA/minimal"}
Electronics: ${form.elec === "yes" ? "High-end" : form.elec === "some" ? "A few items" : "Minimal"}

Give me:
1. Container size (LCL/20ft/40ft) with exact cost for our situation
2. Specific items to SHIP with reason and dollar savings
3. Specific items to SELL here with reason
4. Voltage compatibility — which US appliances won't work in India (230V/50Hz)
5. Indian customs duty for returning NRIs — what's duty-free, what gets taxed
6. Top 3 expensive mistakes NRI families make when shipping
7. Booking timeline — what to do and when
⭐ Bottom Line: container size, total cost, money saved by being strategic`);
  };

  return (
    <div className="pb-10">
      <div className="px-4 pt-7 pb-0">
        <div className="text-[11px] font-semibold text-text-4 uppercase tracking-[.05em] mb-1.5">Step 3 of 4</div>
        <h2 className="text-[32px] font-bold leading-[1.1] mb-2.5" style={{ fontFamily: "Georgia,serif" }}>
          📦 What to Ship<br /><span className="text-blue">vs. What to Sell</span>
        </h2>
        <p className="text-[13px] text-text-3 leading-relaxed mb-6">
          Shipping the wrong things wastes thousands. Get the exact plan for your household.
        </p>
      </div>
      <Card>
        <AdvisorHeader icon="📦" title="Shipping Advisor" iconBg="bg-blue/10" iconBorder="border-blue/22" />
        <div className="px-4 pb-4 flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <Select label="Family Size" value={form.family} onChange={e => set("family", e.target.value)} options={["1 person","2 people","Family (3-4)","Large family (5+)"]} />
            <Select label="Home Size" value={form.size} onChange={e => set("size", e.target.value)} options={["1 BHK / Studio","2 BHK","3 BHK","4+ BHK"]} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Select label="Furniture?" value={form.furn} onChange={e => set("furn", e.target.value)} options={[{value:"yes",label:"Yes, significant"},{value:"some",label:"Some pieces"},{value:"no",label:"IKEA / minimal"}]} />
            <Select label="Electronics?" value={form.elec} onChange={e => set("elec", e.target.value)} options={[{value:"yes",label:"Yes, high-end"},{value:"some",label:"A few items"},{value:"no",label:"Minimal"}]} />
          </div>
          <GoldBtn onClick={handleAnalyze} disabled={ai.loading}>{ai.loading ? "Calculating..." : "✦ Calculate My Shipping Plan"}</GoldBtn>
        </div>
        <AIResult {...ai} />
      </Card>
      <div className="px-4"><SectionLabel>Container Cost Guide</SectionLabel></div>
      <div className="grid grid-cols-2 gap-2.5 px-4 mb-3.5">
        {TILES.map(t => (
          <div key={t.label} className="bg-navy-2 border border-white/8 rounded-[14px] p-3.5">
            <div className="text-[22px] mb-2">{t.icon}</div>
            <div className="text-[10px] font-bold text-text-4 uppercase tracking-[.06em] mb-1.5">{t.label}</div>
            <div className="text-[20px] font-bold text-gold-l mb-1" style={{ fontFamily: "Georgia,serif" }}>{t.val}</div>
            <div className="text-[11px] text-text-3">{t.note}</div>
          </div>
        ))}
      </div>
      <div className="px-4">
        <Alert type="gold" icon="⏱️">
          Sea freight takes <strong className="text-gold-l">6–10 weeks door-to-door.</strong> Book at least 3 months before your move. Summer months are peak — prices spike 20–30%.
        </Alert>
        <Alert type="red" icon="⚡">
          <strong className="text-red">Voltage warning:</strong> US = 110V/60Hz. India = 230V/50Hz. Most kitchen appliances and hair tools will NOT work in India — sell them here.
        </Alert>
        <GoldBtn onClick={onNext}>Continue to Car →</GoldBtn>
      </div>
    </div>
  );
}
