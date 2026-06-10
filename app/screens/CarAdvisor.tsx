"use client";
import { useState } from "react";
import { Card, GoldBtn, Input, Select, Alert, KnowRow, SectionLabel, AIResult, AdvisorHeader } from "../components/ui";
import { useAdvisor } from "../hooks/useAdvisor";
import { CarForm } from "../types";

export default function CarAdvisor({ onNext }: { onNext: () => void }) {
  const [form, setForm] = useState<CarForm>({ year: "", make: "", model: "", miles: "", cond: "good" });
  const { ai, analyze } = useAdvisor("car");
  const set = (k: keyof CarForm, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleAnalyze = () => {
    if (!form.year || !form.make || !form.model || !form.miles) { alert("Please fill in all car details."); return; }
    analyze(`NRI selling their car in the USA before moving to India.
Car: ${form.year} ${form.make} ${form.model}, ${form.miles} miles, Condition: ${form.cond}

Give me:
1. Realistic private sale price range for this exact car in today's US market
2. Estimated offers: CarMax vs Carvana vs private sale vs dealer trade-in (specific dollar amounts)
3. Whether shipping this car to India makes sense — show freight + customs duty math (100-160% of value)
4. Best strategy to sell quickly with a fixed move date
5. Known issues with this make/model that affect resale value
6. What to fix/clean before selling to maximize price
⭐ Bottom Line: which platform, expected price, exact order of steps`);
  };

  return (
    <div className="pb-10">
      <div className="px-4 pt-7 pb-0">
        <div className="text-[11px] font-semibold text-text-4 uppercase tracking-[.05em] mb-1.5">Step 4 of 4</div>
        <h2 className="text-[32px] font-bold leading-[1.1] mb-2.5" style={{ fontFamily: "Georgia,serif" }}>
          🚗 Sell Your Car<br /><span className="text-amber">for Max Value</span>
        </h2>
        <p className="text-[13px] text-text-3 leading-relaxed mb-6">
          Your car is the last thing you sell — you&apos;ll need it until the final days. Get a price estimate and selling strategy for your specific vehicle.
        </p>
      </div>
      <Card>
        <AdvisorHeader icon="🚗" title="Car Value Advisor" iconBg="bg-amber/10" iconBorder="border-amber/22" />
        <div className="px-4 pb-4 flex flex-col gap-2.5">
          <div className="grid grid-cols-3 gap-2">
            <Input label="Year" type="number" placeholder="2020" value={form.year} onChange={e => set("year", e.target.value)} />
            <Input label="Make" placeholder="Toyota" value={form.make} onChange={e => set("make", e.target.value)} />
            <Input label="Model" placeholder="Camry" value={form.model} onChange={e => set("model", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Input label="Mileage" type="number" placeholder="45000" value={form.miles} onChange={e => set("miles", e.target.value)} />
            <Select label="Condition" value={form.cond} onChange={e => set("cond", e.target.value)} options={[{value:"excellent",label:"Excellent"},{value:"good",label:"Good"},{value:"fair",label:"Fair"},{value:"poor",label:"Poor"}]} />
          </div>
          <GoldBtn onClick={handleAnalyze} disabled={ai.loading}>{ai.loading ? "Analyzing..." : "✦ Analyze My Car Value"}</GoldBtn>
        </div>
        <AIResult {...ai} />
      </Card>
      <div className="px-4"><SectionLabel>Platform Comparison</SectionLabel></div>
      <Card>
        <div className="px-4 py-4">
          <KnowRow q="CarMax — instant offer, same day cash" a="~85% of value" aColor="#F0A030" />
          <KnowRow q="Carvana — online offer, 24–48hrs" a="~87% of value" aColor="#F0A030" />
          <KnowRow q="Facebook Marketplace / private sale" a="~100% of value" aColor="#2ECC8A" />
          <KnowRow q="Dealer trade-in" a="~75–80% of value" aColor="#F05A5A" />
        </div>
      </Card>
      <div className="px-4">
        <Alert type="red" icon="⚠️">
          Shipping to India: freight $1,500–$3,000 + <strong className="text-red">customs duty 100–160% of car value.</strong> A $20,000 car costs $30,000+ to import. Sell it here.
        </Alert>
        <GoldBtn onClick={onNext}>View My Complete Checklist →</GoldBtn>
      </div>
    </div>
  );
}
