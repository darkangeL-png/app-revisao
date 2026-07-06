# 📚 App de Revisão (Flashcards)

Uma aplicação simples de flashcards para revisão de conteúdos, desenvolvida com **Node.js** e **Express**. O projeto possui uma interface web estática e uma API REST responsável por gerenciar os cartões de estudo armazenados em um arquivo JSON.

## ✨ Funcionalidades

- 📖 Navegação entre flashcards
- 👀 Exibir ou ocultar a resposta do cartão
- ➕ Criar novos flashcards
- 🗑️ Excluir cartões existentes
- 🎲 Sortear um conjunto aleatório de cartões para revisão
- 💾 Persistência local utilizando `data/cards.json`

---

# 🏗️ Estrutura do Projeto

```
.
├── data/
│   └── cards.json          # Banco de dados local
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   └── server/
│       └── index.js        # Servidor Express
│
├── package.json
├── package-lock.json
└── .gitignore
```

---

# 🚀 Tecnologias

- Node.js
- Express
- HTML5
- CSS3
- JavaScript (Vanilla)

---

# 📋 Requisitos

- Node.js **16** ou superior
- npm (ou Yarn)

---

# ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
```

Entre na pasta do projeto:

```bash
cd SEU-REPOSITORIO
```

Instale as dependências:

```bash
npm install
```

---

# ▶️ Executando

### Produção

```bash
npm start
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:3000
```

---

# 📡 API

Todas as rotas utilizam o prefixo:

```
/api/cards
```

## Listar cartões

```http
GET /api/cards
```

### Resposta

```json
[
  {
    "question": "O que é Node.js?",
    "answer": "Um ambiente de execução JavaScript."
  }
]
```

---

## Criar cartão

```http
POST /api/cards
```

### Body

```json
{
  "question": "Pergunta",
  "answer": "Resposta"
}
```

---

## Excluir cartão

```http
DELETE /api/cards/:index
```

Exemplo:

```
DELETE /api/cards/0
```

---

# 💾 Armazenamento

Os cartões são armazenados localmente em:

```
data/cards.json
```

Caso o projeto seja publicado como código aberto, recomenda-se:

- remover dados pessoais antes do commit;
- utilizar um arquivo `cards.example.json`;
- adicionar `data/` ao `.gitignore`, caso os dados sejam privados.

---

# 🔒 Segurança

Foi realizada uma verificação utilizando:

```bash
npm audit
```

Foi identificada uma vulnerabilidade de alta severidade relacionada ao **nodemon**, utilizado apenas durante o desenvolvimento.

Ela não afeta a aplicação em produção, porém é recomendado executar:

```bash
npm audit fix
```

ou atualizar o `nodemon` para a versão mais recente.

---

# ☁️ Deploy no Vercel

1. Envie o projeto para um repositório no GitHub.

2. Acesse:

```
https://vercel.com
```

3. Clique em **New Project**.

4. Importe o repositório.

5. O Vercel fará automaticamente o deploy dos arquivos estáticos.

## ⚠️ Importante

O sistema de arquivos do Vercel é **efêmero**.

Isso significa que alterações em:

```
data/cards.json
```

não serão persistidas após novas execuções da aplicação.

Para persistência dos dados, utilize um banco de dados externo, como:

- Supabase
- Firebase
- MongoDB Atlas
- PostgreSQL
- MySQL
- Railway
- Render

---

# 📌 Melhorias Futuras

- Sistema de autenticação
- Categorias de flashcards
- Busca por cartões
- Importação e exportação em JSON
- Revisão por repetição espaçada (Spaced Repetition)
- Modo escuro
- Estatísticas de estudo
- Edição de cartões
- Favoritos

---

# 📄 Licença

Este projeto está disponível sob a licença **MIT**.

Sinta-se à vontade para estudar, modificar e contribuir.
