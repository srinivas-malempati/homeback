"use client";
import { useState } from "react";
import { Card, GoldBtn, Input, Select, Alert, KnowRow, SectionLabel, AIResult, AdvisorHeader } from "../components/ui";
import { useAdvisor } from "../hooks/useAdvisor";
import { HomeForm } from "../types";

export default function HomeAdvisor({ onNext }: { onNext: () => void }) {
  const [form, setForm] = useState<HomeForm>({ type: "Single Family", beds: "3 bed", buy: "", val: "", yrs: "", pri: "yes", city: "" });
  const { ai, analyze } = useAdvisor("home");
  const set = (k: keyof HomeForm, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleAnalyze = () => {
    if (!form.buy || !form.val || !form.yrs) { alert("Please fill purchase price, current value, and years owned."); return; }
    const gain = parseInt(form.val) - parseInt(form.buy);
    analyze(`I am an Indian NRI selling my US home before moving back to India permanently.
Home: ${form.type}, ${form.beds}, Location: ${form.city || "USA"}
Purchase price: $${form.buy}, Current estimated value: $${form.val}
Years owned: ${form.yrs}, Primary residence: ${form.pri}
Estimated capital gain: $${gain}

Give me:
1. Exact capital gains tax math — exclusion amount, taxable gain, tax owed
2. Net proceeds after realtor (5.5%) + closing costs (1%) + any capital gains tax
3. Whether to sell before or after moving — exact tax difference
4. How to send proceeds to India: NRE/NRO accounts, FEMA limits, wire timeline
5. The single most expensive mistake NRIs make selling their US home
⭐ Bottom Line: exact estimated net amount landing in my Indian bank account`);
  };

  return (
    <div className="pb-10">
      <div className="px-4 pt-7 pb-0">
        <div className="text-[11px] font-semibold text-text-4 uppercase tracking-[.05em] mb-1.5">Step 1 of 4</div>
        <h2 className="text-[32px] font-bold leading-[1.1] mb-2.5" style={{ fontFamily: "Georgia,serif" }}>
          🏡 Sell Your<br /><span className="text-gold-l">US Home</span>
        </h2>
        <p className="text-[13px] text-text-3 leading-relaxed mb-6">
          Your home is your biggest asset. Get a real breakdown — exact tax liability, net proceeds, and what actually arrives in your Indian bank account.
        </p>
      </div>
      <Card>
        <AdvisorHeader icon="🏡" title="Home Sale Advisor" iconBg="bg-gold/12" iconBorder="border-gold/28" />
        <div className="px-4 pb-4 flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <Select label="Home Type" value={form.type} onChange={e => set("type", e.target.value)} options={["Single Family","Townhouse","Condo"]} />
            <Select label="Bedrooms" value={form.beds} onChange={e => set("beds", e.target.value)} options={["1 bed","2 bed","3 bed","4 bed","5+ bed"]} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Input label="Purchase Price ($)" type="number" placeholder="380000" value={form.buy} onChange={e => set("buy", e.target.value)} />
            <Input label="Current Value ($)" type="number" placeholder="520000" value={form.val} onChange={e => set("val", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Input label="Years Owned" type="number" placeholder="6" value={form.yrs} onChange={e => set("yrs", e.target.value)} />
            <Select label="Primary Residence?" value={form.pri} onChange={e => set("pri", e.target.value)} options={[{value:"yes",label:"Yes"},{value:"no",label:"No / Rental"}]} />
          </div>
          <Input label="City / State" placeholder="San Jose, CA" value={form.city} onChange={e => set("city", e.target.value)} />
          <GoldBtn onClick={handleAnalyze} disabled={ai.loading}>{ai.loading ? "Analyzing..." : "✦ Analyze My Home Sale"}</GoldBtn>
        </div>
        <AIResult {...ai} />
      </Card>
      <div className="px-4"><SectionLabel>Capital Gains Quick Reference</SectionLabel></div>
      <Card>
        <div className="px-4 py-4">
          <p className="font-bold text-[16px] mb-3" style={{ fontFamily: "Georgia,serif" }}>🏛️ Section 121 Tax Exclusion</p>
          <KnowRow q="Single filer exclusion" a="$250,000" aColor="#2ECC8A" />
          <KnowRow q="Married filing jointly" a="$500,000" aColor="#2ECC8A" />
          <KnowRow q="Qualification requirement" a="2 of last 5 years" aColor="#F0EEF8" />
          <KnowRow q="Tax rate on gains above exclusion" a="15–20%" aColor="#F0A030" />
          <KnowRow q="Realtor commission" a="5–6%" aColor="#F05A5A" />
          <KnowRow q="Closing costs" a="~1%" aColor="#F05A5A" />
        </div>
      </Card>
      <div className="px-4">
        <Alert type="gold" icon="💡">
          <strong className="text-gold-l">Sell before you leave.</strong> Once you become a non-resident, you may lose the Section 121 exclusion. Timing your sale right could save you $75,000–$100,000 in taxes.
        </Alert>
        <GoldBtn onClick={onNext}>Continue to Finances →</GoldBtn>
      </div>
    </div>
  );
}
