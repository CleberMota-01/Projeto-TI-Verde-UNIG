import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, Section } from "@/components/site";
import {
  criarCompromisso, editarCompromisso, excluirCompromisso, listarCompromissos, listarHabitos, validarCompromisso,
  type Compromisso, type Habito,
} from "@/lib/compromissos";

export const Route = createFileRoute("/_authenticated/compromissos")({
  head: () => ({
    meta: [
      { title: "Meus compromissos | TI Verde" },
      { name: "description", content: "Cadastre, edite e exclua seus compromissos com hábitos sustentáveis da campanha TI Verde." },
      { property: "og:title", content: "Meus compromissos TI Verde" },
      { property: "og:description", content: "Registre os hábitos sustentáveis que você se compromete a praticar." },
    ],
  }),
  component: Page,
});

function Form({ habitos, inicial, onDone }: { habitos: Habito[]; inicial?: Compromisso; onDone: () => void }) {
  const qc = useQueryClient();
  const [titulo, setTitulo] = useState(inicial?.titulo ?? "");
  const [mensagem, setMensagem] = useState(inicial?.mensagem ?? "");
  const [sel, setSel] = useState<number[]>(inicial?.habitos ?? []);
  const [erro, setErro] = useState<string | null>(null);
  const m = useMutation({
    mutationFn: () => inicial ? editarCompromisso(inicial.id, titulo, mensagem, sel, inicial.habitos) : criarCompromisso(titulo, mensagem, sel),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["compromissos"] }); if (!inicial) { setTitulo(""); setMensagem(""); setSel([]); } onDone(); },
    onError: () => setErro("Não foi possível salvar. Tente novamente."),
  });
  function submit(e: FormEvent) {
    e.preventDefault();
    const v = validarCompromisso(titulo, mensagem, sel);
    setErro(v); if (!v) m.mutate();
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block text-sm font-medium">Título
        <input value={titulo} maxLength={100} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex.: Meu compromisso para este semestre" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2" />
      </label>
      <label className="block text-sm font-medium">Mensagem (opcional)
        <textarea value={mensagem} maxLength={500} onChange={(e) => setMensagem(e.target.value)} rows={2} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2" />
      </label>
      <fieldset>
        <legend className="text-sm font-medium">Hábitos que vou praticar</legend>
        <ul className="mt-2 grid gap-2 md:grid-cols-2">
          {habitos.map((h) => {
            const on = sel.includes(h.id);
            return (
              <li key={h.id}>
                <button type="button" role="checkbox" aria-checked={on} onClick={() => setSel(on ? sel.filter((x) => x !== h.id) : [...sel, h.id])}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition-colors ${on ? "border-primary bg-secondary" : "hover:bg-muted"}`}>
                  <span className={`grid size-6 shrink-0 place-items-center rounded-md border-2 ${on ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>{on && <Check className="size-4" />}</span>
                  {h.descricao}
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>
      {erro && <p className="text-sm text-destructive" role="alert">{erro}</p>}
      <div className="flex gap-2">
        <button disabled={m.isPending} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">{m.isPending ? "Salvando..." : inicial ? "Salvar alterações" : "Cadastrar compromisso"}</button>
        {inicial && <button type="button" onClick={onDone} className="rounded-lg border px-4 py-2 text-sm font-medium">Cancelar</button>}
      </div>
    </form>
  );
}

function Page() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editando, setEditando] = useState<string | null>(null);
  const habitosQ = useQuery({ queryKey: ["habitos"], queryFn: listarHabitos });
  const compQ = useQuery({ queryKey: ["compromissos"], queryFn: listarCompromissos });
  const del = useMutation({ mutationFn: excluirCompromisso, onSuccess: () => qc.invalidateQueries({ queryKey: ["compromissos"] }) });
  const habitos = habitosQ.data ?? [];
  const nome = (id: number) => habitos.find((h) => h.id === id)?.descricao ?? "";

  return (
    <>
      <PageHeader eyebrow="Campanha TI Verde" title="Meus compromissos"
        subtitle="Registre os hábitos sustentáveis que você se compromete a praticar. Só você vê os seus compromissos." />
      <Section>
        <div className="mb-4 flex justify-end">
          <button onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }} className="text-sm font-medium text-primary hover:underline">Sair da conta</button>
        </div>
        <div className="card-soft p-6">
          <h2 className="text-xl font-bold text-forest">Novo compromisso</h2>
          <div className="mt-4">{habitosQ.isLoading ? <p className="text-sm text-muted-foreground">Carregando hábitos...</p> : <Form habitos={habitos} onDone={() => {}} />}</div>
        </div>
        <h2 className="mt-10 text-xl font-bold text-forest">Compromissos salvos</h2>
        {compQ.isLoading && <p className="mt-3 text-sm text-muted-foreground">Carregando...</p>}
        {compQ.isError && <p className="mt-3 text-sm text-destructive">Não foi possível carregar seus compromissos.</p>}
        {compQ.data?.length === 0 && <p className="mt-3 text-sm text-muted-foreground">Você ainda não cadastrou nenhum compromisso.</p>}
        <ul className="mt-4 space-y-4">
          {compQ.data?.map((c) => (
            <li key={c.id} className="card-soft p-6">
              {editando === c.id ? <Form habitos={habitos} inicial={c} onDone={() => setEditando(null)} /> : (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-bold">{c.titulo}</h3>
                      <p className="text-xs text-muted-foreground">Atualizado em {new Date(c.updated_at).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditando(c.id)} aria-label="Editar" className="rounded-md border p-2 hover:bg-muted"><Pencil className="size-4" /></button>
                      <button onClick={() => { if (confirm("Excluir este compromisso?")) del.mutate(c.id); }} aria-label="Excluir" className="rounded-md border p-2 text-destructive hover:bg-muted"><Trash2 className="size-4" /></button>
                    </div>
                  </div>
                  {c.mensagem && <p className="mt-2 text-sm">{c.mensagem}</p>}
                  <ul className="mt-3 space-y-1 text-sm">{c.habitos.map((h) => <li key={h} className="flex gap-2"><Check className="size-4 shrink-0 text-primary" />{nome(h)}</li>)}</ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
