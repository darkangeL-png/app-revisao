# App de Revisão

Pequena aplicação para revisar conteúdo via cartões (flashcards). Projeto reorganizado para padrão simples de frontend + backend.

Estrutura principal:

- `public/` — arquivos servidos ao cliente (HTML/CSS/JS)
- `src/server/` — código do servidor Express
- `data/` — arquivo `cards.json` com os cartões

Comandos:

```bash
npm install
npm start
```

O servidor serve a UI em `http://localhost:3000` e a API em `/api/cards`.
