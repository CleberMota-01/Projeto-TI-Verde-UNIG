import { createFileRoute } from "@tanstack/react-router";
import { Recycle, Repeat, Zap, ArrowRight } from "lucide-react";
import { Btn, PageHeader, Section } from "@/components/site";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o projeto | TI Verde" },
      { name: "description", content: "Os três pilares do projeto TI Verde: descarte consciente, reutilização e eficiência energética." },
      { property: "og:title", content: "Sobre o projeto | TI Verde" },
      { property: "og:description", content: "Conscientização sobre a Tecnologia da Informação Verde." },
    ],
  }),
  component: Sobre,
});

const pillars = [
  { icon: Recycle, title: "Descarte consciente", text: "Orientar sobre o descarte adequado de equipamentos eletrônicos, pilhas e baterias, incentivando a procura por pontos de coleta apropriados." },
  { icon: Repeat, title: "Reutilização e economia circular", text: "Incentivar o conserto, a doação, o reaproveitamento e o prolongamento da vida útil dos equipamentos, evitando o descarte prematuro." },
  { icon: Zap, title: "Eficiência energética", text: "Promover hábitos de economia de energia, como desligar computadores, televisores e monitores quando não estiverem em uso." },
];

function Sobre() {
  return (
    <>
      <PageHeader eyebrow="O projeto" title="Sobre o projeto"
        subtitle="O projeto busca conscientizar a comunidade sobre a importância da Tecnologia da Informação Verde, também conhecida como TI Verde." />
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: I, title, text }, i) => (
            <article key={title} className="card-soft p-7 fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="grid size-12 place-items-center rounded-xl bg-accent text-primary"><I className="size-6" /></span>
              <p className="mt-5 text-sm font-semibold text-muted-foreground">Pilar {i + 1}</p>
              <h2 className="mt-1 text-xl font-bold text-forest">{title}</h2>
              <p className="mt-3 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-forest p-8 text-forest-foreground md:p-10">
          <p className="max-w-3xl text-lg">A proposta busca transformar informação em atitudes práticas que possam ser aplicadas no cotidiano.</p>
          <div className="mt-6"><Btn to="/pesquisa" variant="outline">Ver resultados da pesquisa <ArrowRight className="size-4" /></Btn></div>
        </div>
      </Section>
    </>
  );
}
