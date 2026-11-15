const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

router.get('/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

module.exports = router;
