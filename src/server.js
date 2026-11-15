import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';

import notesRouter from './routes/notes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(pinoHttp());

app.use('/notes', notesRouter);

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
