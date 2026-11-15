const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');

const notesRouter = require('./routes/notes');

const setupServer = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(pinoHttp());

  // Маршрути
  app.use('/notes', notesRouter);

  // Тестовий маршрут для перевірки 500
  app.get('/test-error', () => {
    throw new Error('Simulated server error');
  });

  // 404 middleware
  app.use((req, res) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  // 500 middleware
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: err.message,
    });
  });

  return app;
};

module.exports = setupServer;
