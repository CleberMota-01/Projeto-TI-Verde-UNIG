# TI Verde: Tecnologia que Cuida do Futuro

Site acadêmico sobre TI Verde, os alunos participantes são: Cleber Mota, Nicole louise, Yago Cruz e Gabriel Arsênio, para acessar nosso site, clique no link fixado: https://clebermota-01.github.io/Projeto-TI-Verde-UNIG/


## Sobre os dados

A pesquisa foi aplicada a 17 participantes, com 7 perguntas. Os números, percentuais e interpretações vêm do material do trabalho e não devem ser alterados ou substituídos por valores fictícios.


Todo o conteúdo está em português do Brasil.

## Stack

- React 19 + TypeScript
- TanStack Start (rotas, SSR)
- Tailwind CSS v4
- Recharts (gráficos)
- Lovable Cloud (banco de dados e autenticação)
- Vitest (testes)

## Rodando localmente

Pré-requisito: Node.js 20+ (e bun, se preferir).

```sh
npm install        # ou: bun install
npm run dev        # ou: bun run dev
```

Abra http://localhost:8080

Outros comandos:

```sh
npm run build      # geração da versão de produção
npm run test       # testes automatizados
```

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Início: título, subtítulo e chamadas para conhecer o projeto e ver a pesquisa |
| `/sobre` | Sobre o projeto: objetivos, público-alvo e pilares de atuação |
| `/pesquisa` | Pesquisa e dashboard: indicadores, gráficos e comparação entre empresas |
| `/ods-12` | ODS 12: consumo e produção responsáveis, metas 12.2, 12.5 e 12.8 |
| `/campanha` | Campanha TI Verde: dicas, ações de implementação e checklist de hábitos |
| `/conclusao` | Conclusão do trabalho |
| `/auth` | Cadastro e login |
| `/compromissos` | Área do usuário: compromissos pessoais (protegida por login) |

## Banco de dados

Três tabelas relacionadas em `public` (script em `drizzle/migrations/`):

| Tabela | Papel | Chaves |
| --- | --- | --- |
| `habitos` | Os 6 hábitos da campanha | `id` (PK, smallint), `descricao` (única) |
| `compromissos` | Compromissos criados pelo usuário | `id` (PK, uuid), `user_id` (dono), `titulo`, `mensagem`, datas |
| `compromisso_habitos` | Liga cada compromisso aos hábitos escolhidos | `compromisso_id` (FK → `compromissos`, com exclusão em cascata), `habito_id` (FK → `habitos`); chave primária composta |

Relacionamento: um usuário tem vários compromissos; cada compromisso tem vários hábitos; um hábito pode estar em vários compromissos (N:N via `compromisso_habitos`).

Segurança: RLS ativado nas três tabelas. Cada pessoa só vê, edita e exclui os próprios compromissos (`auth.uid()`). A listagem de hábitos é pública somente para leitura.

Importante: os **resultados da pesquisa continuam estáticos** em `src/lib/data.ts` — o banco guarda apenas os compromissos pessoais, sem alterar os dados originais do trabalho.

## Autenticação

Cadastro e login por e-mail e senha. No cadastro, o usuário confirma o acesso pelo link enviado por e-mail antes de entrar. A página `/compromissos` exige sessão ativa e redireciona para `/auth` quando não autenticada.

## Estrutura

```text
src/
  assets/        imagem de capa
  components/    cabeçalho, rodapé e blocos do site
  integrations/  clientes do backend (gerados automaticamente)
  lib/           dados da pesquisa e operações de compromissos
  routes/        uma página por arquivo
  test/          testes de dados e de validação
drizzle/         script de criação das tabelas
supabase/        configuração do backend
```
