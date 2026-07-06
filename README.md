# App de Revisão (Flashcards)

Aplicação simples de flashcards para revisão de conteúdo. Esta versão foi organizada para servir uma interface estática em `public/` e um back-end minimalista em `src/server/` que lê/grava os cartões em `data/cards.json`.

Principais recursos
- Interface interativa para navegar entre cartões e ver respostas
- Criar novos cartões via formulário (persistidos em `data/cards.json`)
- Apagar cartões pelo back-end
- Modo de sortear um conjunto de cartões (ex.: 10 cartões aleatórios)

Estrutura do projeto

- `public/` — arquivos do cliente (HTML, CSS, JS, favicon)
- `public/js/app.js` — lógica do cliente (consome a API)
- `public/css/style.css` — estilos e tema
- `src/server/index.js` — servidor Express que expõe a API e serve os assets estáticos
- `data/cards.json` — arquivo JSON com os cartões (atualmente vazio por padrão)
- `package.json` — dependências e scripts
- `.gitignore` — arquivos ignorados pelo Git

Requisitos

- Node.js 16+ recomendado
- npm (ou yarn)

Instalação e execução local

```bash
# instalar dependências
npm install

# rodar em produção simples
npm start

# rodar em modo de desenvolvimento (recarregamento com nodemon)
npm run dev
```

A aplicação será servida em `http://localhost:3000`.

API

Todas as rotas partem de `/api/cards` e retornam/consomem JSON.

- GET `/api/cards` — retorna a lista de cartões
- POST `/api/cards` — adiciona um cartão; corpo JSON: `{ "question": "...", "answer": "..." }`
- DELETE `/api/cards/:index` — remove o cartão no índice especificado (0-based)

Notas sobre dados

- O arquivo `data/cards.json` é o armazenamento simples do projeto. Se você pretende publicar o repositório público, considere:
	- remover dados sensíveis (se houver) antes do commit,
	- ou adicionar `data/` ao `.gitignore` e fornecer um `data/cards.example.json` com exemplos.

Segurança e dependências

- Fiz uma verificação rápida com `npm audit` — há entradas de alta severidade relacionadas a `nodemon` (devDependency). Isso não impacta o runtime, mas recomendo atualizar `nodemon` para a versão segura ou executar `npm audit fix` quando apropriado.

Sugestões antes de publicar no Git

1. Atualize o `package.json` com `description`, `author`, `repository` e `keywords`.
2. Adicione um arquivo `LICENSE` (sugestão: MIT) se desejar publicar com uma licença permissiva.
3. Decida se `data/cards.json` deve ser comitado ou mantido local (adicionar ao `.gitignore`).
4. Remova ou confirme que não há segredos no projeto.
5. (Opcional) Configure GitHub Actions para rodar `npm audit` e checks básicos.

Commit inicial sugerido

```bash
git init
git add .
git commit -m "chore: estrutura inicial e melhorias de UI"
git branch -M main
# adicionar remote e push
git remote add origin <repo-url>
git push -u origin main
```

Quer que eu:

- atualize o `package.json` com campos básicos (description/author/repository),
- gere um arquivo `LICENSE` (MIT) e um `cards.example.json`,
- atualize `data/cards.json` para conter exemplos, ou
- inicialize um repositório Git e faça o commit inicial aqui?

Se preferir, aplico qualquer combinação automaticamente.

---

Arquivo principal: [public/index.html](public/index.html)

