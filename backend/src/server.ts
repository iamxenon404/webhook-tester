import app from './app';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Webhook Tester running on http://localhost:${PORT}`);
  console.log(`POST http://localhost:${PORT}/create to generate a new webhook endpoint`);
});