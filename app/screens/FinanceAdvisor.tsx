"use client";
import { useState } from "react";
import { Card, GoldBtn, Input, Select, Alert, KnowRow, SectionLabel, AIResult, AdvisorHeader } from "../components/ui";
import { useAdvisor } from "../hooks/useAdvisor";
import { FinanceForm } from "../types";

export default function FinanceAdvisor({ onNext }: { onNext: () => void }) {
  const [form, setForm] = useState<FinanceForm>({ bal401: "", age: "", income: "", status: "married", ira: "", stocks: "" });
  const { ai, analyze } = useAdvisor("finance");
  const set = (k: keyof FinanceForm, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleAnalyze = () => {
    if (!form.bal401 || !form.age || !form.income) { alert("Please fill 401k balance, age, and annual income."); return; }
    const under = parseInt(form.age) < 59;
    analyze(`NRI aged ${form.age} moving to India permanently.
401k: $${form.bal401}, IRA: $${form.ira || 0}, US Stocks/ETFs: $${form.stocks || 0}
Annual income: $${form.income}, Filing status: ${form.status}
${under ? "Under 59½ — 10% early withdrawal penalty APPLIES" : "Over 59½ — no early withdrawal penalty"}

Give me:
1. EXACT math if I cash out 401k today — federal tax + ${under ? "10% penalty + " : ""}state tax = exact dollars lost
2. Dollar amount I receive vs. lose if I withdraw now
3. IRA rollover — zero tax now, exact steps, how to manage from India
4. DTAA India-US treaty — exactly how it protects me, what I file yearly
5. If I LEAVE 401k in US — annual requirements, how to withdraw from India at 59½
6. Best move for US stocks $${form.stocks || 0} — sell now vs hold
7. NRE vs NRO — which receives which funds, tax treatment
8. Step-by-step sequence before leaving
⭐ Bottom Line: smart strategy vs. cashing out — exact dollar difference`);
  };

  return (
    <div className="pb-10">
      <div className="px-4 pt-7 pb-0">
        <div className="text-[11px] font-semibold text-text-4 uppercase tracking-[.05em] mb-1.5">Step 2 of 4</div>
        <h2 className="text-[32px] font-bold leading-[1.1] mb-2.5" style={{ fontFamily: "Georgia,serif" }}>
          💰 Finances &<br /><span className="text-green">401k Strategy</span>
        </h2>
        <p className="text-[13px] text-text-3 leading-relaxed mb-6">
          Most NRIs lose $30,000–$50,000 by making the wrong 401k decision. Get the exact numbers and strategy to keep as much as possible.
        </p>
      </div>
      <Card>
        <AdvisorHeader icon="💰" title="401k & Tax Advisor" iconBg="bg-green/10" iconBorder="border-green/22" />
        <div className="px-4 pb-4 flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <Input label="401k Balance ($)" type="number" placeholder="150000" value={form.bal401} onChange={e => set("bal401", e.target.value)} />
            <Input label="Your Age" type="number" placeholder="38" value={form.age} onChange={e => set("age", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Input label="Annual Income ($)" type="number" placeholder="180000" value={form.income} onChange={e => set("income", e.target.value)} />
            <Select label="Filing Status" value={form.status} onChange={e => set("status", e.target.value)} options={[{value:"single",label:"Single"},{value:"married",label:"Married"}]} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Input label="IRA Balance ($)" type="number" placeholder="40000" value={form.ira} onChange={e => set("ira", e.target.value)} />
            <Input label="US Stocks/ETFs ($)" type="number" placeholder="75000" value={form.stocks} onChange={e => set("stocks", e.target.value)} />
          </div>
          <GoldBtn onClick={handleAnalyze} disabled={ai.loading}>{ai.loading ? "Calculating..." : "✦ Analyze My Financial Exit"}</GoldBtn>
        </div>
        <AIResult {...ai} />
      </Card>
      <div className="px-4"><SectionLabel>401k Scenarios at a Glance</SectionLabel></div>
      <Card>
        <div className="px-4 py-4">
          <p className="font-bold text-base mb-3" style={{ fontFamily: "Georgia,serif" }}>💸 If You Cash Out Early (under 59½)</p>
          <KnowRow q="IRS early withdrawal penalty" a="10% flat" aColor="#F05A5A" />
          <KnowRow q="Federal income tax on withdrawn amount" a="22–37%" aColor="#F05A5A" />
          <KnowRow q="State income tax (CA)" a="Up to 13.3%" aColor="#F05A5A" />
          <KnowRow q="Total loss on a $100k withdrawal" a="$35k–$50k" aColor="#F05A5A" />
        </div>
      </Card>
      <Card>
        <div className="px-4 py-4">
          <p className="font-bold text-base mb-3" style={{ fontFamily: "Georgia,serif" }}>✅ Smarter Options</p>
          <KnowRow q="Leave 401k, withdraw after age 59½" a="No 10% penalty" aColor="#2ECC8A" />
          <KnowRow q="Roll over to Traditional IRA" a="Zero taxes now" aColor="#2ECC8A" />
          <KnowRow q="DTAA India-US treaty protection" a="No double tax" aColor="#2ECC8A" />
          <KnowRow q="Annual US filing required after move" a="Yes, every year" aColor="#F0A030" />
        </div>
      </Card>
      <div className="px-4">
        <Alert type="green" icon="💡">
          <strong className="text-green">Most NRIs leave their 401k in the US</strong> and withdraw after age 59½. The DTAA treaty ensures India won&apos;t tax what the US already taxed.
        </Alert>
        <GoldBtn onClick={onNext}>Continue to Shipping →</GoldBtn>
      </div>
    </div>
  );
}
