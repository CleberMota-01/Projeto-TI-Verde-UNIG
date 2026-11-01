import { createFileRoute } from "@tanstack/react-router";
import { Home, BarChart3, Leaf } from "lucide-react";
import { Btn, Section } from "@/components/site";

export const Route = createFileRoute("/conclusao")({
  head: () => ({
    meta: [
      { title: "Conclusão | TI Verde" },
      { name: "description", content: "Um futuro mais sustentável começa com nossas escolhas: conclusão do projeto TI Verde." },
      { property: "og:title", content: "Um futuro mais sustentável começa com nossas escolhas" },
      { property: "og:description", content: "Conclusão do projeto acadêmico TI Verde, alinhado ao ODS 12." },
    ],
  }),
  component: Conclusao,
});

function Conclusao() {
  return (
    <Section className="py-20">
      <div className="mx-auto max-w-3xl text-center fade-up">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-accent text-primary"><Leaf className="size-7" /></span>
        <p className="eyebrow mt-6">Conclusão</p>
        <h1 className="mt-3 text-3xl font-extrabold text-forest md:text-5xl">Um futuro mais sustentável começa com nossas escolhas</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">A Tecnologia da Informação Verde mostra que o uso responsável da tecnologia envolve tanto as empresas quanto as pessoas. Os resultados da pesquisa reforçam a importância da conscientização sobre o descarte correto, a reutilização de equipamentos e a economia de energia. Alinhado ao ODS 12, o projeto propõe ações educativas que incentivem hábitos sustentáveis e contribuam para a preservação dos recursos naturais.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Btn to="/"><Home className="size-4" /> Voltar ao início</Btn>
          <Btn to="/pesquisa" variant="outline"><BarChart3 className="size-4" /> Consultar resultados da pesquisa</Btn>
        </div>
      </div>
    </Section>
  );
}
