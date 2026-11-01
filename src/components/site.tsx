import { Link } from "@tanstack/react-router";
import { Leaf, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

export const navItems = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre o projeto" },
  { to: "/pesquisa", label: "Pesquisa e dashboard" },
  { to: "/ods-12", label: "ODS 12" },
  { to: "/campanha", label: "Campanha TI Verde" },
  { to: "/conclusao", label: "Conclusão" },
  { to: "/compromissos", label: "Meus compromissos" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-forest">
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"><Leaf className="size-4" /></span>
      TI Verde
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden gap-1 lg:flex" aria-label="Principal">
          {navItems.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary !text-primary" }}>{n.label}</Link>
          ))}
        </nav>
        <button className="rounded-md p-2 lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 py-2 lg:hidden" aria-label="Menu móvel">
          {navItems.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }}
              className="block rounded-md px-3 py-3 text-sm font-medium text-muted-foreground"
              activeProps={{ className: "bg-secondary !text-primary" }}>{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-forest text-forest-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-bold"><Leaf className="size-5" /> TI Verde: Tecnologia que Cuida do Futuro</p>
          <p className="mt-3 max-w-md text-sm opacity-80">Projeto acadêmico de conscientização sobre sustentabilidade na tecnologia: descarte correto, reutilização, doação, economia de energia e consumo responsável.</p>
        </div>
        <nav className="grid grid-cols-2 gap-2 text-sm" aria-label="Rodapé">
          {navItems.map((n) => <Link key={n.to} to={n.to} className="opacity-80 hover:opacity-100 hover:underline">{n.label}</Link>)}
        </nav>
      </div>
      <p className="border-t border-forest-foreground/15 py-5 text-center text-xs opacity-70">Trabalho acadêmico · Alinhado ao ODS 12 da ONU</p>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-14 fade-up md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold text-forest md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-6xl px-4 py-14 ${className}`}>{children}</section>;
}

export function Btn({ to, children, variant = "primary" }: { to: "/" | "/sobre" | "/pesquisa" | "/ods-12" | "/campanha" | "/conclusao"; children: ReactNode; variant?: "primary" | "outline" }) {
  const cls = variant === "primary"
    ? "bg-primary text-primary-foreground hover:bg-primary/90"
    : "border border-primary/30 bg-card text-primary hover:bg-secondary";
  return <Link to={to} className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${cls}`}>{children}</Link>;
}
