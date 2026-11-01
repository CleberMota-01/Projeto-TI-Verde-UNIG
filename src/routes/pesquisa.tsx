import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from "recharts";
import { Users, HelpCircle, Repeat, Mail, Check, Minus, Lightbulb, Sun, Cloud, Trash2, Cpu } from "lucide-react";
import { PageHeader, Section } from "@/components/site";
import { questions, type Question, TOTAL, pct, positiveByQuestion, companies, matrix, type Company, type Tone } from "@/lib/data";

export const Route = createFileRoute("/pesquisa")({
  head: () => ({
    meta: [
      { title: "Pesquisa e dashboard | TI Verde" },
      { name: "description", content: "Resultados da pesquisa com 17 pessoas e comparação de práticas de Dell, HP e Google." },
      { property: "og:title", content: "TI Verde: O que descobrimos" },
      { property: "og:description", content: "Dashboard interativo com os resultados da pesquisa sobre TI Verde." },
    ],
  }),
  component: Pesquisa,
});

const toneColor: Record<Tone, string> = {
  positive: "var(--positive)",
  neutral: "var(--neutral-answer)",
  negative: "var(--negative)",
};

function SurveyPanel() {
  const [active, setActive] = useState(0);
  const q = (questions[active] ?? questions[0]) as Question;
  const data = q.answers.filter((a) => a.count > 0);
  return (
    <div className="card-soft p-5 md:p-8">
      <div role="tablist" aria-label="Perguntas da pesquisa" className="flex flex-wrap gap-2">
        {questions.map((item, i) => (
          <button key={item.id} role="tab" aria-selected={i === active} onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${i === active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"}`}>
            P{item.id} · {item.short}
          </button>
        ))}
      </div>
      <div className="mt-8 grid items-center gap-8 md:grid-cols-2" key={q.id}>
        <div className="relative h-72 fade-up">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="count" nameKey="label" innerRadius="62%" outerRadius="92%" paddingAngle={data.length > 1 ? 2 : 0} stroke="none">
                {data.map((a) => <Cell key={a.label} fill={toneColor[a.tone]} />)}
              </Pie>
              <Tooltip formatter={(v: number, n: string) => [`${v} pessoas (${pct(v)})`, n]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
            <div><p className="font-display text-4xl font-bold text-forest">{TOTAL}</p><p className="text-xs text-muted-foreground">participantes</p></div>
          </div>
        </div>
        <div className="fade-up">
          <p className="text-sm font-semibold text-primary">Pergunta {q.id}</p>
          <h3 className="mt-1 text-xl font-bold text-forest">{q.text}</h3>
          <ul className="mt-5 space-y-2">
            {q.answers.map((a) => (
              <li key={a.label} className="flex items-center justify-between rounded-lg bg-muted px-4 py-3">
                <span className="flex items-center gap-3"><span className="size-3 rounded-full" style={{ background: toneColor[a.tone] }} />{a.label}</span>
                <span className="text-sm"><strong>{a.count}</strong> {a.count === 1 ? "pessoa" : "pessoas"} · {pct(a.count)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">Total: {q.answers.reduce((s, a) => s + a.count, 0)} participantes</p>
          <div className="mt-5 flex gap-3 rounded-xl border-l-4 border-primary bg-secondary p-4">
            <Lightbulb className="size-5 shrink-0 text-primary" /><p className="text-sm">{q.insight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyTable() {
  const [sel, setSel] = useState<Company | "all">("all");
  const opts: { id: Company | "all"; name: string }[] = [{ id: "all", name: "Todas" }, ...companies];
  const hl = (c: Company) => (sel === c ? "bg-accent" : sel === "all" ? "" : "opacity-40");
  return (
    <div className="card-soft p-5 md:p-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar empresa">
        {opts.map((o) => (
          <button key={o.id} aria-pressed={sel === o.id} onClick={() => setSel(o.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${sel === o.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"}`}>{o.name}</button>
        ))}
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3 pr-4 font-semibold">Prática ambiental</th>
              {companies.map((c) => <th key={c.id} className={`px-3 py-3 text-center font-semibold transition-all ${hl(c.id)}`}>{c.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row) => (
              <tr key={row.practice} className="border-b last:border-0">
                <td className="py-3 pr-4">{row.practice}</td>
                {companies.map((c) => (
                  <td key={c.id} className={`px-3 py-3 text-center transition-all ${hl(c.id)}`}>
                    {row[c.id]
                      ? <Check className="mx-auto size-5 text-positive" aria-label="Prática indicada" />
                      : <Minus className="mx-auto size-5 text-muted-foreground" aria-label="Prática não identificada" />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="mt-8 text-lg font-bold text-forest">Metas e destaque de cada empresa</h4>
      <p className="mt-1 text-sm text-muted-foreground">Compromissos públicos informados por cada empresa no material consultado.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {companies.map((c) => (
          <article key={c.id} className={`rounded-xl border bg-background p-5 transition-all ${sel === c.id ? "border-primary shadow-sm" : sel === "all" ? "border-border" : "opacity-40"}`}>
            <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">Destaque</span>
            <h5 className="mt-3 font-bold text-forest">{c.name}</h5>
            <p className="mt-1 text-sm font-semibold text-primary">{c.destaque}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {c.metas.map((m) => <li key={m} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{m}</li>)}
            </ul>
          </article>
        ))}
      </div>
      {sel !== "all" && (
        <div className="mt-6 rounded-xl bg-secondary p-5 fade-up" key={sel}>
          <h4 className="font-bold text-forest">Práticas citadas: {companies.find((c) => c.id === sel)!.name}</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {companies.find((c) => c.id === sel)!.practices.map((p) => <li key={p} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{p}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

function Pesquisa() {
  const kpis = [
    { icon: Users, v: "17", t: "participantes da pesquisa" },
    { icon: HelpCircle, v: "100%", t: "têm dúvidas sobre onde descartar eletrônicos" },
    { icon: Repeat, v: "100%", t: "já reutilizaram, doaram ou consertaram um aparelho" },
    { icon: Mail, v: "100%", t: "querem receber mais informações sobre TI Verde" },
  ];
  const google = [
    { icon: Sun, v: "12 GW", t: "nova energia limpa contratada" },
    { icon: Cloud, v: "58 milhões de t", t: "emissões de CO₂ equivalente evitadas na operação e cadeia de valor" },
    { icon: Trash2, v: "88%", t: "dos resíduos operacionais dos data centers próprios desviados do descarte" },
    { icon: Cpu, v: "7,5 milhões", t: "componentes de equipamentos desativados reutilizados" },
  ];
  return (
    <>
      <PageHeader eyebrow="Pesquisa e dashboard" title="TI Verde: O que descobrimos"
        subtitle="Pesquisa com 17 pessoas do público em geral e análise de práticas de sustentabilidade de Dell Technologies, HP e Google." />

      <Section>
        <h2 className="text-2xl font-bold text-forest">Indicadores gerais</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map(({ icon: I, v, t }) => (
            <div key={t} className="card-soft p-6">
              <I className="size-5 text-primary" />
              <p className="mt-3 font-display text-4xl font-bold text-forest">{v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 card-soft p-5 md:p-8">
          <h3 className="text-lg font-bold text-forest">Respostas positivas por pergunta (%)</h3>
          <p className="text-sm text-muted-foreground">Consolidação dos indicadores conforme o material de referência do trabalho.</p>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={positiveByQuestion} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: "var(--secondary)" }}
                  formatter={(v: number) => [`${String(v).replace(".", ",")}%`, "Respostas positivas"]}
                  labelFormatter={(l, p) => `${l}: ${p?.[0]?.payload?.label ?? ""}`} />
                <Bar dataKey="value" fill="var(--positive)" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="value" position="top" formatter={(v: number) => `${String(v).replace(".", ",")}%`} className="text-xs" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-4 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
            {positiveByQuestion.map((p) => <li key={p.name}><strong>{p.name}</strong>: {p.label}</li>)}
          </ul>
        </div>
      </Section>

      <Section className="pt-0">
        <h2 className="text-2xl font-bold text-forest">Pesquisa com o público</h2>
        <p className="mt-2 text-muted-foreground">Selecione uma pergunta para ver o gráfico, as quantidades e a interpretação.</p>
        <div className="mt-6"><SurveyPanel /></div>
      </Section>

      <Section className="pt-0">
        <h2 className="text-2xl font-bold text-forest">Empresas pesquisadas</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">A tabela resume as práticas identificadas no material consultado para o trabalho e não representa uma auditoria completa das empresas.</p>
        <div className="mt-6"><CompanyTable /></div>
      </Section>

      <Section className="pt-0">
        <h2 className="text-2xl font-bold text-forest">Impacto ambiental e energia: Google em 2025</h2>
        <p className="mt-2 text-muted-foreground">Indicadores informados pela empresa no Relatório Ambiental de 2026, conforme o material do trabalho.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {google.map(({ icon: I, v, t }) => (
            <div key={t} className="rounded-2xl bg-forest p-6 text-forest-foreground">
              <I className="size-5 text-leaf" />
              <p className="mt-3 font-display text-3xl font-bold">{v}</p>
              <p className="mt-1 text-sm opacity-85">{t}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm italic text-muted-foreground">Dell e HP não apresentam, no material consultado para esta comparação, números equivalentes a estes indicadores.</p>
      </Section>

      <Section className="pt-0">
        <div className="rounded-2xl border-2 border-primary/30 bg-secondary p-8 md:p-10">
          <h2 className="text-2xl font-bold text-forest">O que os resultados nos mostram</h2>
          <p className="mt-4 max-w-4xl text-lg">Quem já ouviu falar de TI Verde nem sempre sabe como agir. Todos os participantes têm dúvidas sobre o descarte correto, mas todos querem aprender. Por isso, a proposta é a campanha 'TI Verde: Tecnologia que Cuida do Futuro', com orientação sobre pontos de coleta, incentivo ao conserto e à doação, dicas de economia de energia e palestras em escolas e comunidades.</p>
        </div>
      </Section>
    </>
  );
}
