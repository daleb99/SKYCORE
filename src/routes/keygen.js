const express = require('express');
const rand = require('random-key');

const router = express.Router();

// GET request to get a key
router.get('/', (req, res) => {
  const key = rand.generate();
  res.json({ key });
});

module.exports = router;
