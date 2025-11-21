**Finança Fácil**

- **Descrição:**: Projeto backend + frontend para gerenciar finanças pessoais (contas, transações, autenticação por código por e‑mail). O backend usa NestJS + TypeORM + Postgres; o frontend (pasta `app`) é uma aplicação Next.js.

**Estrutura Geral**

- `api/`: backend NestJS
  - `src/`: código fonte
    - `main.ts`: bootstrap do Nest
    - `app.module.ts`: módulo principal (TypeORM, módulos importados)
    - `auth/`: autenticação por código (envio por e‑mail, verificação, emissão de cookie JWT)
    - `users/`: módulo de usuários e perfis (`User`, `Profile`, `UsersService`, `UsersController`)
    - `users/accounts/`: entidades e endpoints de `Account` (contas do usuário)
    - `database/`: serviço e abstração para checagem de conexão/DB
    - `accounts/` (compat layer): re‑exports para compatibilidade com import antigos
  - `package.json`: scripts e dependências
  - `.env` (local): variáveis de ambiente (DB, SMTP, JWT)
- `app/`: frontend Next.js (layout, páginas, estilos)
- `requests/`: coleções HTTP (ex.: `user.http`) para testes rápidos

**Principais conceitos e decisões**

- Autenticação leve por e‑mail: gera código único, envia por SMTP (Brevo), verifica e emite JWT via cookie `auth` (httpOnly).
- Inversão de dependência: controllers dependem de serviços/abreviações (ex.: `DatabaseService` via token). Facilita testes.
- `Profile` separado de `User`: modelo `User` leve e `Profile` com campos opcionais (avatar, displayName, bio).
- `Account` associada ao `User` (1:N) — contas são aninhadas sob rota REST `/users/:userId/accounts`.
- Em desenvolvimento o TypeORM está configurado com `synchronize: true` para facilitar iterações rápidas. Em produção é obrigatório usar migrations.

**Variáveis de ambiente (exemplo `api/.env`)**

```
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=senha
PGDATABASE=postgres

SMTP_HOST=smtp.brevo.com
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=<SUA_CHAVE_SMTP_BREVO>
EMAIL_FROM=no-reply@seu-dominio.com

JWT_SECRET=uma_chave_secreta
JWT_EXPIRES_IN=7d
COOKIE_MAX_AGE_MS=604800000
PORT=3000
```

**Como rodar (desenvolvimento)**

- Backend:

```cmd
cd api
npm install
npm run start:dev
```

- Frontend (Next.js):

```cmd
cd app
npm install
npm run dev
```

**Rotas úteis (resumo)**

- `GET /db-test` — testa conexão com o Postgres
- `POST /auth/send-code` — enviar código de verificação por e‑mail
- `POST /auth/verify-code` — verificar código; em caso de sucesso retorna cookie `auth`
- `GET /users/:id` — obter usuário (inclui `profile` e `accounts`)
- `GET /users/by-email?email=...` — buscar usuário por email
- `PATCH /users/:id/profile` — atualizar perfil
- `PATCH /users/:id/status` — ativar/inativar ou setar admin
- `POST /users/:userId/accounts` — criar conta para usuário

**Notas e próximos passos recomendados**

- Substituir `synchronize: true` por migrations e gerar migrações com TypeORM antes de deploy.
- Adicionar validação (`class-validator`) e DTOs nas rotas públicas.
- Adicionar rate limiting nas rotas de envio de código e proteções contra abuso.
- Armazenar códigos de verificação hashed (bcrypt) para segurança adicional.
- Implementar testes unitários e e2e para fluxos críticos (auth, accounts).

Se quiser, eu posso:

- gerar migrations para o esquema atual,
- adicionar DTOs/validações para os endpoints de usuário e accounts,
- criar um script `npm run db:reset` para desenvolvimento.
