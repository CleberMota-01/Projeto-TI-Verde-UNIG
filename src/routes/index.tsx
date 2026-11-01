import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Recycle, Zap, Repeat } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Btn, Section } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TI Verde: Tecnologia que Cuida do Futuro" },
      { name: "description", content: "Pequenas atitudes, grandes mudanças. Descubra como a tecnologia pode contribuir para um futuro mais sustentável." },
      { property: "og:title", content: "TI Verde: Tecnologia que Cuida do Futuro" },
      { property: "og:description", content: "Projeto acadêmico sobre descarte correto, reutilização e economia de energia na tecnologia." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div className="fade-up">
          <p className="eyebrow">Projeto acadêmico · TI Verde</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-forest md:text-6xl">TI Verde: Tecnologia que Cuida do Futuro</h1>
          <p className="mt-5 text-lg text-muted-foreground">Pequenas atitudes, grandes mudanças. Descubra como a tecnologia pode contribuir para um futuro mais sustentável.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn to="/sobre">Conheça o projeto <ArrowRight className="size-4" /></Btn>
            <Btn to="/pesquisa" variant="outline"><BarChart3 className="size-4" /> Ver resultados da pesquisa</Btn>
          </div>
        </div>
        <img src={hero} width={1280} height={1024} alt="Ilustração de notebook e celular entre folhas, com turbina eólica, painel solar e símbolo de reciclagem" className="w-full rounded-2xl card-soft" />
      </section>
      <Section className="pt-0">
        <div className="card-soft p-8 md:p-10">
          <h2 className="text-2xl font-bold text-forest">Sobre esta apresentação</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">O projeto aborda práticas sustentáveis no uso da tecnologia, com foco na conscientização ambiental, no descarte correto de eletrônicos e no prolongamento da vida útil dos equipamentos.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Recycle, t: "Descarte correto" },
              { icon: Repeat, t: "Reutilização e doação" },
              { icon: Zap, t: "Economia de energia" },
            ].map(({ icon: I, t }) => (
              <div key={t} className="flex items-center gap-3 rounded-xl bg-secondary p-4">
                <I className="size-5 text-primary" /><span className="font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
