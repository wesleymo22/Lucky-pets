<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">🐾 Lucky Pets API</h1>

<p align="center">
  API RESTful para gestão de usuários, pets e agendamentos veterinários.<br/>
  Desenvolvida com <a href="https://nestjs.com/" target="_blank">NestJS</a>, <a href="https://www.prisma.io/" target="_blank">Prisma ORM</a> e <a href="https://swagger.io/" target="_blank">Swagger</a>.
</p>

---

## 🧩 Tecnologias

- **NestJS** — framework Node.js para aplicações escaláveis
- **Prisma ORM** — acesso ao banco de dados PostgreSQL
- **JWT (Json Web Token)** — autenticação segura
- **Swagger** — documentação automática da API
- **Class Validator / Transformer** — validação de DTOs
- **bcrypt** — hash de senhas
- **Docker (opcional)** — para subir o banco de dados rapidamente

---

## ⚙️ Funcionalidades

### 👤 Usuários
- Cadastro, listagem, atualização e remoção de usuários
- Login e autenticação via **JWT**
- Hash seguro de senhas com **bcrypt**

### 🐶 Pets
- CRUD completo de pets
- Cada pet pertence a um usuário

### 📅 Agendamentos
- CRUD de agendamentos de serviços veterinários (data, serviço e observações)
- Cada agendamento pertence a um pet
- Filtro de listagem por **data** e **tipo de serviço**

### 🌱 Seeds automáticos
Ao executar o projeto, são criados:
- **1 usuário**
- **2 pets**
- **2 agendamentos** relacionados

---

## 🚀 Configuração do projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seu-usuario/lucky-pets-api.git
cd lucky-pets-api
```


### 2️⃣ Instalar as dependências
```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente
Copie o arquivo de exemplo e configure conforme seu ambiente local:

```bash
cp .env.example .env
```

Em seguida, edite o arquivo .env com suas credenciais de banco e chave JWT:

```bash
DATABASE_URL="postgresql://postgres:123456@localhost:5432/lucky_pets?schema=public"
JWT_SECRET="minha_chave_super_segura"
PORT=3000
```

⚠️ Importante: Certifique-se de que o banco PostgreSQL está rodando antes de iniciar a aplicação.
Você pode usar Docker para isso.

🐘 Banco de dados com Docker (opcional)

Se quiser rodar o banco via Docker, basta criar um container PostgreSQL:

```bash
npm run compose:up
```

🗃️ Banco de dados e Prisma

Após configurar o ambiente, crie o banco e aplique as migrations:

```bash
npx prisma migrate dev
```

Popule o banco com os seeds automáticos:

```bash
npx prisma db seed
```

E, se quiser visualizar seus dados de forma interativa:

```bash
npx prisma studio
```

### 🧠 Scripts principais
## Ambiente de desenvolvimento:

```bash
npm run start:dev
```

### 📘 Documentação da API

Após iniciar o servidor, acesse o Swagger em:

👉 http://localhost:3000/api/docs

Lá você poderá testar todas as rotas diretamente pelo navegador.

### 🧑‍💻 Autor

Desenvolvido por Wesley