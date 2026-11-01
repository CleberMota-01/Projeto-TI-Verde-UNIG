export type Tone = "positive" | "neutral" | "negative";
export interface Answer { label: string; count: number; tone: Tone }
export interface Question { id: number; short: string; text: string; answers: Answer[]; insight: string }

export const TOTAL = 17;

export const questions: Question[] = [
  { id: 1, short: "Conhece TI Verde", text: "Você já tinha ouvido falar em TI Verde?",
    answers: [{ label: "Sim", count: 9, tone: "positive" }, { label: "Não", count: 8, tone: "negative" }],
    insight: "52,9% conheciam o termo, enquanto 47,1% não conheciam. Isso indica espaço para ampliar a divulgação do conceito." },
  { id: 2, short: "Sabe onde descartar", text: "Você sabe onde descartar corretamente um equipamento eletrônico que não funciona mais?",
    answers: [{ label: "Sim", count: 0, tone: "positive" }, { label: "Não", count: 0, tone: "negative" }, { label: "Tenho dúvidas", count: 17, tone: "neutral" }],
    insight: "Todos os participantes relataram dúvidas sobre o descarte correto. É necessário orientar sobre pontos de coleta e logística reversa." },
  { id: 3, short: "Procura local apropriado", text: "Ao descartar pilhas, baterias ou eletrônicos, você procura um local apropriado?",
    answers: [{ label: "Sempre", count: 6, tone: "positive" }, { label: "Às vezes", count: 10, tone: "neutral" }, { label: "Nunca", count: 1, tone: "negative" }],
    insight: "A maioria procura um local apropriado apenas às vezes. Isso demonstra a necessidade de tornar esse hábito mais frequente." },
  { id: 4, short: "Desliga aparelhos", text: "Você desliga computadores, TVs e monitores quando não estão em uso?",
    answers: [{ label: "Sempre", count: 0, tone: "positive" }, { label: "Às vezes", count: 17, tone: "neutral" }, { label: "Nunca", count: 0, tone: "negative" }],
    insight: "Todos responderam \"Às vezes\". O projeto deve incentivar a transformação da economia de energia em um hábito regular." },
  { id: 5, short: "Reutilizou ou doou", text: "Você já reutilizou, doou ou consertou um equipamento em vez de descartá-lo?",
    answers: [{ label: "Sim", count: 17, tone: "positive" }, { label: "Não", count: 0, tone: "negative" }],
    insight: "Todos os participantes relataram já ter reutilizado, doado ou consertado um aparelho." },
  { id: 6, short: "Empresas sustentáveis", text: "Você considera importante que as empresas adotem práticas sustentáveis em tecnologia?",
    answers: [{ label: "Sim", count: 17, tone: "positive" }, { label: "Não", count: 0, tone: "negative" }, { label: "Não sei", count: 0, tone: "neutral" }],
    insight: "Todos os participantes consideram importante que empresas adotem práticas sustentáveis." },
  { id: 7, short: "Quer mais informações", text: "Você gostaria de receber mais informações sobre TI Verde e descarte correto?",
    answers: [{ label: "Sim", count: 17, tone: "positive" }, { label: "Não", count: 0, tone: "negative" }],
    insight: "Todos os participantes demonstraram interesse em receber mais informações sobre TI Verde." },
];

export const positiveByQuestion = [
  { name: "P1", label: "Conhecimento sobre TI Verde", value: 52.9 },
  { name: "P2", label: "Conhecimento sobre descarte correto", value: 0 },
  { name: "P3", label: "Procura por local apropriado", value: 35.3 },
  { name: "P4", label: "Desligamento de aparelhos", value: 0 },
  { name: "P5", label: "Reutilização", value: 100 },
  { name: "P6", label: "Importância da sustentabilidade empresarial", value: 100 },
  { name: "P7", label: "Interesse em aprender mais", value: 100 },
];

export type Company = "dell" | "hp" | "google";
export interface CompanyInfo {
  id: Company; name: string; practices: string[]; destaque: string; metas: string[];
}
export const companies: CompanyInfo[] = [
  { id: "dell", name: "Dell Technologies", destaque: "Economia circular e recolhimento de equipamentos", practices: [
    "Logística reversa para reciclagem de eletrônicos antigos.",
    "Gerenciamento de energia e resfriamento eficiente em data centers.",
    "Economia circular e prolongamento do uso dos materiais." ],
    metas: [
      "Meta de reutilizar ou reciclar 1 tonelada para cada tonelada de produto vendida até 2030.",
      "Mais de 2,5 bilhões de libras de eletrônicos usados recuperados desde 2007.",
      "Meta de mais da metade do conteúdo dos produtos em material reciclado ou renovável.",
      "Meta de 100% das embalagens recicladas, renováveis ou reutilizadas.",
      "Meta de melhorar 1 bilhão de vidas com inclusão digital até 2030." ] },
  { id: "hp", name: "HP", destaque: "Transformação de resíduo plástico em produto novo", practices: [
    "Programa HP Planet Partners para coleta de computadores, monitores, impressoras e cartuchos.",
    "Recondicionamento e doação de computadores elegíveis.",
    "Utilização de materiais recuperados na fabricação de novos produtos." ],
    metas: [
      "Meta de 30% de plástico reciclado em impressoras e computadores até 2025.",
      "Uso de plástico oceânico em cartuchos e hardware (mais de 25 milhões de garrafas aproveitadas).",
      "Primeiro monitor do mundo fabricado com plástico oceânico.",
      "Meta de 100% de eletricidade renovável nas operações globais até 2035." ] },
  { id: "google", name: "Google", destaque: "Energia limpa e eficiência em data centers", practices: [
    "Contratação de energia limpa e eficiência de hardware, software e data centers.",
    "Reutilização de componentes e redução do envio de resíduos de data centers para descarte.",
    "Dispositivos Pixel com materiais reciclados e suporte de software por vários anos." ],
    metas: [
      "Meta de energia livre de carbono 24/7 em todas as redes onde atua até 2030.",
      "Meta de emissões líquidas zero em toda a operação e cadeia de valor até 2030.",
      "Meta de repor 120% da água doce que consome.",
      "Reposição de água subiu de 18% para 64% do consumo em 2024." ] },
];


export const matrix: { practice: string; dell: boolean; hp: boolean; google: boolean }[] = [
  { practice: "Reciclagem e coleta de equipamentos", dell: true, hp: true, google: true },
  { practice: "Reutilização e recondicionamento", dell: true, hp: true, google: true },
  { practice: "Eficiência energética", dell: true, hp: true, google: true },
  { practice: "Uso de energia limpa", dell: true, hp: true, google: true },
  { practice: "Doação e inclusão digital", dell: true, hp: true, google: true },
  { practice: "Uso de materiais reciclados", dell: true, hp: true, google: true },
  { practice: "Extensão da vida útil dos aparelhos", dell: true, hp: true, google: true },
];

export const pct = (n: number) => `${((n / TOTAL) * 100).toFixed(1).replace(".", ",")}%`;
