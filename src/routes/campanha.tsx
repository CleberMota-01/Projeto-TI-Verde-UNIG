import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Repeat, Zap, Share2, Check } from "lucide-react";
import { PageHeader, Section } from "@/components/site";

export const Route = createFileRoute("/campanha")({
  head: () => ({
    meta: [
      { title: "Campanha TI Verde | TI Verde" },
      { name: "description", content: "Dicas práticas de descarte, reutilização e economia de energia, com checklist de hábitos sustentáveis." },
      { property: "og:title", content: "Campanha TI Verde: Tecnologia que Cuida do Futuro" },
      { property: "og:description", content: "A proposta de intervenção do projeto, com foco em mudança de hábitos." },
    ],
  }),
  component: Campanha,
});

const cards = [
  { icon: Trash2, title: "Descarte corretamente", items: ["Não descarte equipamentos eletrônicos no lixo comum.", "Procure pontos de coleta apropriados para eletrônicos, pilhas e baterias.", "Busque informações sobre os sistemas de coleta e logística reversa disponíveis em sua região."] },
  { icon: Repeat, title: "Reutilize antes de descartar", items: ["Avalie se o equipamento pode ser consertado.", "Considere doar aparelhos que ainda funcionam.", "Prolongue a vida útil dos dispositivos sempre que possível."] },
  { icon: Zap, title: "Economize energia", items: ["Desligue computadores, televisores e monitores quando não estiverem em uso.", "Evite manter equipamentos ligados sem necessidade.", "Adote hábitos conscientes no consumo de energia."] },
  { icon: Share2, title: "Compartilhe conhecimento", items: ["Divulgue informações sobre TI Verde.", "Incentive conversas e ações educativas em escolas e comunidades.", "Ajude outras pessoas a aprender sobre descarte e consumo responsáveis."] },
];

const acoes = ["Divulgação de orientações sobre descarte correto.", "Incentivo ao conserto, à doação e à reutilização.", "Palestras e ações educativas em escolas e comunidades."];

const habits = [
  "Desligo computadores, TVs e monitores quando não estão em uso",
  "Levo pilhas e baterias a pontos de coleta apropriados",
  "Tento consertar um aparelho antes de substituí-lo",
  "Doo equipamentos que ainda funcionam",
  "Separo corretamente os resíduos eletrônicos do lixo comum",
  "Compartilho informações sobre TI Verde com outras pessoas",
];

function Checklist() {
  const [done, setDone] = useState<boolean[]>(habits.map(() => false));
  const count = done.filter(Boolean).length;
  return (
    <div className="card-soft p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-forest">Checklist de hábitos sustentáveis</h2>
          <p className="mt-1 text-sm text-muted-foreground">Marque os hábitos que você já pratica.</p>
        </div>
        <p className="font-display text-lg font-bold text-primary">{count} de {habits.length}</p>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${(count / habits.length) * 100}%` }} />
      </div>
      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {habits.map((h, i) => (
          <li key={h}>
            <button role="checkbox" aria-checked={done[i]} onClick={() => setDone(done.map((d, j) => (j === i ? !d : d)))}
              className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition-colors ${done[i] ? "border-primary bg-secondary" : "hover:bg-muted"}`}>
              <span className={`grid size-6 shrink-0 place-items-center rounded-md border-2 ${done[i] ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>
                {done[i] && <Check className="size-4" />}
              </span>
              {h}
            </button>
          </li>
        ))}
      </ul>
      <Link to="/compromissos" className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Salvar meus compromissos</Link>
      {count > 0 && (
        <button onClick={() => setDone(habits.map(() => false))} className="ml-4 mt-4 text-sm font-medium text-primary hover:underline">Desmarcar todos</button>
      )}
    </div>
  );
}

function Campanha() {
  return (
    <>
      <PageHeader eyebrow="Proposta de intervenção" title="TI Verde: Tecnologia que Cuida do Futuro"
        subtitle="A campanha é a proposta de intervenção do projeto, com foco em conscientização e mudança de hábitos." />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map(({ icon: I, title, items }) => (
            <article key={title} className="card-soft p-7">
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-primary"><I className="size-5" /></span>
              <h2 className="mt-4 text-xl font-bold text-forest">{title}</h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                {items.map((it) => <li key={it} className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-primary" />{it}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <Section className="pt-0">
        <div className="rounded-2xl bg-forest p-8 text-forest-foreground md:p-10">
          <h2 className="text-2xl font-bold">Como podemos colocar a campanha em prática?</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {acoes.map((a, i) => (
              <li key={a} className="rounded-xl bg-forest-foreground/10 p-5">
                <span className="font-display text-3xl font-bold text-leaf">{i + 1}</span>
                <p className="mt-2">{a}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>
      <Section className="pt-0"><Checklist /></Section>
    </>
  );
}
