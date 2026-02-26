import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🪝 Xenlog404 running on http://localhost:${PORT}`);
  console.log(`POST http://localhost:${PORT}/create to generate a new webhook endpoint`);
});