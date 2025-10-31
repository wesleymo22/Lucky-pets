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

## 🐳 Subindo o ambiente com Docker

O projeto possui um docker-compose.yml que sobe toda a stack automaticamente:

```bash
docker-compose up --build -d

```

Isso irá:

Criar e iniciar o container PostgreSQL

Criar e iniciar o container da API NestJS

Executar automaticamente as migrations e os seeds no primeiro start

Após a inicialização, a API estará disponível em:

👉 http://localhost:3000

E o Swagger pode ser acessado em:

👉 http://localhost:3000/api/docs

## 🐘 Subir apenas o banco de dados com Docker

Se desejar subir somente o banco de dados (sem iniciar a aplicação NestJS), você pode usar o comando abaixo:

```bash
docker compose up db -d
```

Isso irá:

Criar e iniciar apenas o container MySQL

Disponibilizar o banco em localhost:3306

Manter o volume persistente mysql_data para não perder dados ao reiniciar

O banco estará acessível com as credenciais definidas no docker-compose.yml:

Host: localhost
Porta: 3306
Usuário: prisma
Senha: prisma
Banco: petsdb

Após o container estar rodando, você pode conectar-se ao banco usando:

O Prisma, executando npx prisma migrate dev

Ou qualquer cliente MySQL, como DBeaver, TablePlus ou MySQL Workbench

## 🧠 Scripts úteis (modo local)

Caso deseje rodar sem Docker:

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

## 📘 Documentação da API

Após iniciar o servidor, acesse o Swagger em:

👉 http://localhost:3000/api/docs

Lá você poderá testar todas as rotas diretamente pelo navegador.

## 🧑‍💻 Autor

Desenvolvido por Wesley