import { supabase } from "@/integrations/supabase/client";

export interface Habito { id: number; descricao: string }
export interface Compromisso {
  id: string; titulo: string; mensagem: string | null; created_at: string; updated_at: string;
  habitos: number[];
}

export function validarCompromisso(titulo: string, mensagem: string, habitos: number[]): string | null {
  const t = titulo.trim();
  if (t.length < 1) return "Informe um título.";
  if (t.length > 100) return "O título pode ter no máximo 100 caracteres.";
  if (mensagem.trim().length > 500) return "A mensagem pode ter no máximo 500 caracteres.";
  if (habitos.length === 0) return "Escolha pelo menos um hábito.";
  return null;
}

export async function listarHabitos(): Promise<Habito[]> {
  const { data, error } = await supabase.from("habitos").select("id, descricao").order("id");
  if (error) throw error;
  return data;
}

export async function listarCompromissos(): Promise<Compromisso[]> {
  const { data, error } = await supabase
    .from("compromissos")
    .select("id, titulo, mensagem, created_at, updated_at, compromisso_habitos(habito_id)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(({ compromisso_habitos, ...c }) => ({ ...c, habitos: compromisso_habitos.map((h) => h.habito_id) }));
}

export async function criarCompromisso(titulo: string, mensagem: string, habitos: number[]) {
  const { data, error } = await supabase.from("compromissos")
    .insert({ titulo: titulo.trim(), mensagem: mensagem.trim() || null }).select("id").single();
  if (error) throw error;
  const { error: e2 } = await supabase.from("compromisso_habitos")
    .insert(habitos.map((habito_id) => ({ compromisso_id: data.id, habito_id })));
  if (e2) { await supabase.from("compromissos").delete().eq("id", data.id); throw e2; }
}

export async function editarCompromisso(id: string, titulo: string, mensagem: string, habitos: number[], anteriores: number[]) {
  const { error } = await supabase.from("compromissos")
    .update({ titulo: titulo.trim(), mensagem: mensagem.trim() || null }).eq("id", id);
  if (error) throw error;
  const remover = anteriores.filter((h) => !habitos.includes(h));
  const adicionar = habitos.filter((h) => !anteriores.includes(h));
  if (remover.length) {
    const { error: e } = await supabase.from("compromisso_habitos").delete().eq("compromisso_id", id).in("habito_id", remover);
    if (e) throw e;
  }
  if (adicionar.length) {
    const { error: e } = await supabase.from("compromisso_habitos").insert(adicionar.map((habito_id) => ({ compromisso_id: id, habito_id })));
    if (e) throw e;
  }
}

export async function excluirCompromisso(id: string) {
  const { error } = await supabase.from("compromissos").delete().eq("id", id);
  if (error) throw error;
}
