CREATE TABLE public.habitos (
  id SMALLINT PRIMARY KEY,
  descricao TEXT NOT NULL UNIQUE
);
GRANT SELECT ON public.habitos TO anon, authenticated;
GRANT ALL ON public.habitos TO service_role;
ALTER TABLE public.habitos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Hábitos são públicos" ON public.habitos FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.habitos (id, descricao) VALUES
 (1, 'Desligo computadores, TVs e monitores quando não estão em uso'),
 (2, 'Levo pilhas e baterias a pontos de coleta apropriados'),
 (3, 'Tento consertar um aparelho antes de substituí-lo'),
 (4, 'Doo equipamentos que ainda funcionam'),
 (5, 'Separo corretamente os resíduos eletrônicos do lixo comum'),
 (6, 'Compartilho informações sobre TI Verde com outras pessoas');

CREATE TABLE public.compromissos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL DEFAULT auth.uid(),
  titulo TEXT NOT NULL CHECK (char_length(titulo) BETWEEN 1 AND 100),
  mensagem TEXT CHECK (mensagem IS NULL OR char_length(mensagem) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX compromissos_user_idx ON public.compromissos(user_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.compromissos TO authenticated;
GRANT ALL ON public.compromissos TO service_role;
ALTER TABLE public.compromissos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ver os próprios compromissos" ON public.compromissos FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Criar os próprios compromissos" ON public.compromissos FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Editar os próprios compromissos" ON public.compromissos FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Excluir os próprios compromissos" ON public.compromissos FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER compromissos_updated_at BEFORE UPDATE ON public.compromissos FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.compromisso_habitos (
  compromisso_id UUID NOT NULL REFERENCES public.compromissos(id) ON DELETE CASCADE,
  habito_id SMALLINT NOT NULL REFERENCES public.habitos(id) ON DELETE RESTRICT,
  PRIMARY KEY (compromisso_id, habito_id)
);
CREATE INDEX compromisso_habitos_habito_idx ON public.compromisso_habitos(habito_id);
GRANT SELECT, INSERT, DELETE ON public.compromisso_habitos TO authenticated;
GRANT ALL ON public.compromisso_habitos TO service_role;
ALTER TABLE public.compromisso_habitos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ver hábitos dos próprios compromissos" ON public.compromisso_habitos FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.compromissos c WHERE c.id = compromisso_id AND c.user_id = auth.uid()));
CREATE POLICY "Adicionar hábitos aos próprios compromissos" ON public.compromisso_habitos FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.compromissos c WHERE c.id = compromisso_id AND c.user_id = auth.uid()));
CREATE POLICY "Remover hábitos dos próprios compromissos" ON public.compromisso_habitos FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.compromissos c WHERE c.id = compromisso_id AND c.user_id = auth.uid()));