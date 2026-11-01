import { describe, expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { validarCompromisso } from "@/lib/compromissos";

describe("validação de compromissos", () => {
  it("exige título", () => expect(validarCompromisso("  ", "", [1])).not.toBeNull());
  it("exige pelo menos um hábito", () => expect(validarCompromisso("Meu", "", [])).not.toBeNull());
  it("título até 100 caracteres", () => expect(validarCompromisso("a".repeat(101), "", [1])).not.toBeNull());
  it("aceita compromisso válido", () => expect(validarCompromisso("Meu", "ok", [1, 2])).toBeNull());
});
