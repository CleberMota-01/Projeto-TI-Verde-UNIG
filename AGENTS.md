<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
# AGENTS
- Survey results stay static in src/lib/data.ts; the database only stores user commitments (habitos, compromissos, compromisso_habitos) — keeps original research data untouchable.
- Commitment CRUD runs from the browser client under RLS scoped to auth.uid(); signed-in pages live under src/routes/_authenticated.
