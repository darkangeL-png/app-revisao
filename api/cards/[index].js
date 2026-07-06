const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  const { index } = req.query || {};
  const filePath = path.join(process.cwd(), 'data', 'cards.json');

  if (req.method === 'DELETE') {
    return res.status(501).json({ error: 'Apagar não é persistente em Vercel. Use um banco externo.' });
  }

  res.setHeader('Allow', 'DELETE');
  return res.status(405).end('Method Not Allowed');
};
