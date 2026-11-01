import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, Section } from "@/components/site";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar | TI Verde" },
      { name: "description", content: "Entre ou crie sua conta para salvar seus compromissos sustentáveis da campanha TI Verde." },
      { property: "og:title", content: "Entrar no TI Verde" },
      { property: "og:description", content: "Acesse sua conta para registrar seus compromissos com a TI Verde." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [modo, setModo] = useState<"entrar" | "cadastrar">("entrar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setMsg(null); setLoading(true);
    try {
      if (modo === "entrar") {
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
        navigate({ to: "/compromissos" });
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password: senha, options: { emailRedirectTo: `${window.location.origin}/compromissos` } });
        if (error) throw error;
        if (data.session) navigate({ to: "/compromissos" });
        else setMsg("Conta criada! Confirme pelo link enviado ao seu e-mail e depois entre.");
      }
    } catch (err) {
      const m = err instanceof Error ? err.message : "";
      setMsg(m.includes("Invalid login") ? "E-mail ou senha incorretos." : m.includes("not confirmed") ? "Confirme seu e-mail antes de entrar." : m || "Não foi possível continuar.");
    } finally { setLoading(false); }
  }

  return (
    <>
      <PageHeader eyebrow="Área do participante" title={modo === "entrar" ? "Entrar" : "Criar conta"}
        subtitle="Entre para salvar, editar e acompanhar seus compromissos com a TI Verde." />
      <Section>
        <form onSubmit={submit} className="card-soft mx-auto max-w-md space-y-4 p-6">
          <label className="block text-sm font-medium">E-mail
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">Senha
            <input type="password" required minLength={6} value={senha} onChange={(e) => setSenha(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2" />
          </label>
          {msg && <p className="text-sm text-muted-foreground" role="status">{msg}</p>}
          <button disabled={loading} className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-60">
            {loading ? "Aguarde..." : modo === "entrar" ? "Entrar" : "Criar conta"}
          </button>
          <button type="button" onClick={() => { setModo(modo === "entrar" ? "cadastrar" : "entrar"); setMsg(null); }} className="w-full text-sm font-medium text-primary hover:underline">
            {modo === "entrar" ? "Ainda não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
          </button>
        </form>
      </Section>
    </>
  );
}
