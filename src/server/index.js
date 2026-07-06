const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = path.join(__dirname, '..', '..', 'data', 'cards.json');

app.use(cors());
app.use(express.json());

// Serve arquivos estáticos do cliente
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

const defaultCards = [
    { question: 'O que significa a sigla HTML?', answer: 'HyperText Markup Language.' },
    { question: 'Qual a função do CSS?', answer: 'Estilizar o layout e visual da página.' },
    { question: 'Como declaramos constante em JS?', answer: "Utilizando a palavra-chave 'const'." }
];

function readCards() {
    if (!fs.existsSync(FILE_PATH)) {
        fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });
        fs.writeFileSync(FILE_PATH, JSON.stringify(defaultCards, null, 2));
        return defaultCards;
    }
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
}

app.get('/api/cards', (req, res) => {
    try {
        const cards = readCards();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao ler os cartões.' });
    }
});

app.post('/api/cards', (req, res) => {
    try {
        const cards = readCards();
        const newCard = req.body;
        if (!newCard.question || !newCard.answer) {
            return res.status(400).json({ error: 'Pergunta e resposta são obrigatórias.' });
        }
        cards.push(newCard);
        fs.writeFileSync(FILE_PATH, JSON.stringify(cards, null, 2));
        res.status(201).json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao salvar o cartão.' });
    }
});

app.delete('/api/cards/:index', (req, res) => {
    try {
        const cards = readCards();
        const index = parseInt(req.params.index, 10);
        if (isNaN(index) || index < 0 || index >= cards.length) {
            return res.status(400).json({ error: 'Índice inválido.' });
        }
        cards.splice(index, 1);
        fs.writeFileSync(FILE_PATH, JSON.stringify(cards, null, 2));
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao apagar o cartão.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
