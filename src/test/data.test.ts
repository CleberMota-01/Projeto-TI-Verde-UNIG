import { describe, expect, it } from "vitest";
import { questions, TOTAL, matrix, companies, type Company } from "@/lib/data";

describe("dados da pesquisa", () => {
  it("cada pergunta soma 17 participantes", () => {
    for (const q of questions) expect(q.answers.reduce((s, a) => s + a.count, 0)).toBe(TOTAL);
  });
  it("pergunta 1 tem 9 sim e 8 não", () => {
    expect(questions[0]!.answers.map((a) => a.count)).toEqual([9, 8]);
  });
  it("matriz de empresas tem 7 práticas", () => {
    expect(matrix).toHaveLength(7);
  });
  it("todas as práticas estão marcadas com confere para todas as empresas", () => {
    for (const row of matrix) expect([row.dell, row.hp, row.google]).toEqual([true, true, true]);
  });
  it("cada empresa tem um destaque e a quantidade de metas informada no material", () => {
    const esperadas: Record<Company, number> = { dell: 5, hp: 4, google: 4 };
    for (const c of companies) {
      expect(c.destaque.trim().length).toBeGreaterThan(0);
      expect(c.metas.length).toBe(esperadas[c.id]);
      expect(c.metas.every((m) => m.trim().length > 0)).toBe(true);
    }
  });
});
