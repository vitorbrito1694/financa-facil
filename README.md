# Finança Fácil

**Descrição:** Projeto completo para gerenciamento de finanças pessoais. O sistema é composto por uma API robusta em NestJS e um Frontend moderno em Next.js.

## Estrutura do Projeto

O repositório é dividido em duas partes principais:

- **[`api/`](./api)**: Backend construído com NestJS, TypeORM e PostgreSQL. Responsável pela lógica de negócios, autenticação e persistência de dados.
- **[`app/`](./app)**: Frontend construído com Next.js e TailwindCSS. Interface do usuário para interação com o sistema.

## Visão Geral da Arquitetura

- **Autenticação**: Sistema "passwordless" via código por e-mail (SMTP) e JWT (HttpOnly Cookies).
- **Banco de Dados**: PostgreSQL rodando via Docker.
- **Design Pattern**: Inversão de dependência e separação clara de responsabilidades (Services, Controllers, Entities).

## Pré-requisitos

- Node.js (v18+ recomendado)
- Docker e Docker Compose (para o banco de dados)

## Como Rodar o Projeto

Para instruções detalhadas, consulte os READMEs específicos de cada módulo:

- [Guia de Configuração da API](./api/README.md)
- [Guia de Configuração do App (Frontend)](./app/README.md)

### Resumo Rápido

1. **Subir o Banco de Dados**:

   ```bash
   cd api/docker
   docker compose up -d
   ```

2. **Rodar a API**:

   ```bash
   cd api
   npm install
   npm run start:dev
   ```

3. **Rodar o Frontend**:
   ```bash
   cd app
   npm install
   npm run dev
   ```
   O frontend estará disponível em `http://localhost:1240`.

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests.
