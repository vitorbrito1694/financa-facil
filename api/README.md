# Finança Fácil - API

Backend do sistema Finança Fácil, desenvolvido com **NestJS**.

## Tecnologias

- **Framework**: NestJS
- **Banco de Dados**: PostgreSQL
- **ORM**: TypeORM
- **Validação**: class-validator
- **Documentação**: Swagger (em breve)

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz da pasta `api` com base no exemplo abaixo:

```env
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=senha
PGDATABASE=financas_db

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

### 2. Banco de Dados (Docker)

A configuração do banco de dados está localizada em `docker/`. Para iniciar o PostgreSQL:

```bash
cd docker
docker compose up -d
```

Isso iniciará um container com PostgreSQL na porta 5432.

### 3. Instalação das Dependências

```bash
npm install
```

## Executando a Aplicação

```bash
# desenvolvimento
npm run start:dev

# produção
npm run start:prod
```

A API estará rodando em `http://localhost:3000`.

## Estrutura de Pastas

- `src/auth`: Módulo de autenticação (envio de código, verificação, JWT).
- `src/users`: Gestão de usuários e perfis.
- `src/users/accounts`: Gestão de contas bancárias associadas aos usuários.
- `src/database`: Configuração e conexão com o banco.

## Rotas Principais

- `POST /auth/send-code`: Envia código de login por e-mail.
- `POST /auth/verify-code`: Troca o código por um cookie JWT.
- `GET /users/me`: Retorna dados do usuário logado.
