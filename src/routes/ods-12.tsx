import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Recycle, Megaphone, ArrowRight } from "lucide-react";
import { PageHeader, Section } from "@/components/site";

export const Route = createFileRoute("/ods-12")({
  head: () => ({
    meta: [
      { title: "ODS 12: Consumo e Produção Responsáveis | TI Verde" },
      { name: "description", content: "Como o projeto TI Verde se alinha ao ODS 12 da ONU e às metas 12.2, 12.5 e 12.8." },
      { property: "og:title", content: "Nosso compromisso com o ODS 12" },
      { property: "og:description", content: "Consumo e Produção Responsáveis aplicados à tecnologia." },
    ],
  }),
  component: Ods,
});

const metas = [
  { n: "12.2", icon: Leaf, text: "Alcançar a gestão sustentável e o uso eficiente dos recursos naturais.", acao: "Economia de energia, uso responsável de equipamentos e prolongamento da vida útil dos dispositivos." },
  { n: "12.5", icon: Recycle, text: "Reduzir significativamente a geração de resíduos por meio da prevenção, redução, reciclagem e reutilização.", acao: "Reutilização, conserto, doação e descarte correto de equipamentos eletrônicos." },
  { n: "12.8", icon: Megaphone, text: "Garantir que as pessoas tenham informações e conscientização sobre o desenvolvimento sustentável e estilos de vida em harmonia com a natureza.", acao: "Divulgação de informações, campanha educativa e conscientização da comunidade." },
];

function Block({ title, children }: { title: string; children: string }) {
  return (
    <div className="card-soft p-7 md:p-9">
      <h2 className="text-xl font-bold text-forest">{title}</h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function Ods() {
  return (
    <>
      <PageHeader eyebrow="ODS 12 · ONU" title="Nosso compromisso com o ODS 12" subtitle="Consumo e Produção Responsáveis" />
      <Section className="space-y-6">
        <Block title="Introdução">O Objetivo de Desenvolvimento Sustentável 12 (ODS 12), estabelecido pela Organização das Nações Unidas (ONU), tem como finalidade assegurar padrões de consumo e produção responsáveis. Esse objetivo busca reduzir o desperdício de recursos naturais, incentivar a reciclagem, promover o uso eficiente de matérias-primas e estimular práticas sustentáveis na sociedade.</Block>
        <Block title="Relação do projeto com o ODS 12">O projeto está alinhado ao ODS 12 por incentivar a conscientização sobre a importância do consumo responsável e da preservação do meio ambiente. Por meio de ações educativas e práticas sustentáveis, busca-se estimular a redução do desperdício, o reaproveitamento de materiais e o descarte adequado dos resíduos. Além disso, o projeto contribui para a mudança de hábitos individuais e coletivos, demonstrando que pequenas atitudes, como evitar o desperdício de água e energia, reutilizar produtos e separar corretamente o lixo, podem gerar benefícios ambientais e sociais.</Block>
      </Section>
      <Section className="pt-0">
        <h2 className="text-2xl font-bold text-forest">Metas relacionadas ao projeto</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {metas.map(({ n, icon: I, text, acao }) => (
            <article key={n} className="card-soft flex flex-col p-7">
              <div className="flex items-center justify-between">
                <p className="font-display text-5xl font-extrabold text-primary">{n}</p>
                <I className="size-6 text-leaf" />
              </div>
              <p className="mt-4 font-medium">"{text}"</p>
              <div className="mt-auto pt-6">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary"><ArrowRight className="size-3" /> No projeto</p>
                <p className="mt-2 rounded-lg bg-secondary p-3 text-sm">{acao}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-muted-foreground">Essas metas demonstram a importância de incentivar atitudes conscientes e promover a responsabilidade individual e coletiva em relação ao consumo e à produção.</p>
      </Section>
      <Section className="grid gap-6 pt-0 md:grid-cols-2">
        <Block title="Resultados esperados">Espera-se que o projeto contribua para a conscientização dos participantes sobre a importância do consumo responsável, incentivando a redução do desperdício, a reutilização de materiais e o descarte correto dos resíduos. Também se busca estimular hábitos sustentáveis que possam ser aplicados no cotidiano, contribuindo para a preservação dos recursos naturais e para a construção de uma sociedade mais sustentável.</Block>
        <Block title="Conclusão do alinhamento ao ODS 12">Conclui-se que o alinhamento do projeto ao ODS 12 é importante para promover práticas de consumo e produção responsáveis. Ao incentivar a conscientização ambiental e a adoção de hábitos sustentáveis, o projeto contribui para o alcance das metas estabelecidas pela ONU, reforçando a necessidade de utilizar os recursos naturais de maneira consciente e reduzir os impactos ambientais das atividades humanas.</Block>
      </Section>
    </>
  );
}
