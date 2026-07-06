const fs = require('fs');
const path = require('path');

// Nota: em plataformas serverless como Vercel, o sistema de arquivos é efêmero.
// Leitura de `data/cards.json` funciona, mas gravações NÃO são persistidas.

module.exports = async (req, res) => {
  const filePath = path.join(process.cwd(), 'data', 'cards.json');

  if (req.method === 'GET') {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const cards = JSON.parse(raw || '[]');
      return res.status(200).json(cards);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao ler os cartões.' });
    }
  }

  // POST/DELETE não persistem em Vercel — instruímos o usuário a usar um DB externo
  if (req.method === 'POST') {
    return res.status(501).json({ error: 'Persistência não disponível em Vercel. Use um banco externo (Supabase, Firebase, etc.).' });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).end('Method Not Allowed');
};
