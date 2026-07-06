/* Front-end app script reorganizado para public/js */
const API_URL = '/api/cards';

let allCards = [];
let currentDeck = [];
let currentIndex = 0;

const card = document.getElementById('card');
const cardContainer = document.getElementById('card-container');
const questionText = document.getElementById('question-text');
const answerText = document.getElementById('answer-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const randomBtn = document.getElementById('random-btn');
const cardForm = document.getElementById('card-form');
const deleteBtn = document.getElementById('delete-btn');

async function loadCards() {
    try {
        const response = await fetch(API_URL);
        allCards = await response.json();
        currentDeck = [...allCards];
        currentIndex = 0;
        updateCard();
    } catch (error) {
        console.error('Erro ao carregar cards:', error);
        questionText.textContent = 'Erro ao conectar com o servidor.';
        answerText.textContent = 'Verifique se o back-end está rodando.';
    }
}

function updateCard() {
    if (currentDeck.length === 0) {
        questionText.textContent = 'Nenhum cartão cadastrado.';
        answerText.textContent = 'Use o formulário abaixo para adicionar!';
        progress.textContent = '0 / 0';
        return;
    }
    card.classList.remove('flipped');
    setTimeout(() => {
        questionText.textContent = currentDeck[currentIndex].question;
        answerText.textContent = currentDeck[currentIndex].answer;
        progress.textContent = `${currentIndex + 1} / ${currentDeck.length}`;
    }, 150);
}

cardContainer.addEventListener('click', () => {
    if (currentDeck.length > 0) card.classList.toggle('flipped');
});

nextBtn.addEventListener('click', () => {
    if (currentDeck.length === 0) return;
    currentIndex = (currentIndex + 1) % currentDeck.length;
    updateCard();
});

prevBtn.addEventListener('click', () => {
    if (currentDeck.length === 0) return;
    currentIndex = (currentIndex - 1 + currentDeck.length) % currentDeck.length;
    updateCard();
});

cardForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = document.getElementById('new-question').value;
    const answer = document.getElementById('new-answer').value;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, answer })
        });
        if (response.ok) {
            allCards = await response.json();
            currentDeck = [...allCards];
            currentIndex = currentDeck.length - 1;
            updateCard();
            cardForm.reset();
        }
    } catch (error) {
        alert('Erro ao salvar o cartão.');
    }
});

deleteBtn.addEventListener('click', async () => {
    if (currentDeck.length === 0) return;
    const confirmDelete = confirm('Tem certeza que deseja apagar permanentemente este cartão?');
    if (!confirmDelete) return;
    const cardToDelete = currentDeck[currentIndex];
    const realIndex = allCards.findIndex(c => c.question === cardToDelete.question && c.answer === cardToDelete.answer);
    if (realIndex === -1) return;
    try {
        const response = await fetch(`${API_URL}/${realIndex}`, { method: 'DELETE' });
        if (response.ok) {
            allCards = await response.json();
            currentDeck = [...allCards];
            if (currentIndex >= currentDeck.length && currentIndex > 0) currentIndex--;
            updateCard();
            alert('Cartão removido do arquivo JSON!');
        }
    } catch (error) {
        alert('Erro ao tentar apagar o cartão no servidor.');
    }
});

randomBtn.addEventListener('click', () => {
    if (allCards.length === 0) return;
    let shuffled = [...allCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    currentDeck = shuffled.length > 10 ? shuffled.slice(0, 10) : shuffled;
    currentIndex = 0;
    updateCard();
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => loadCards());
