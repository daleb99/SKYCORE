const express = require('express');
const rand = require('random-key');
const User = require('../models/User');

const router = express.Router();

/**
 * Generate a random unique key
 * @returns key
 */
// eslint-disable-next-line consistent-return
async function generateKey() {
  // Generate a key
  const key = rand.generate();

  // Check if key already exists
  const keyExists = await User.findOne({ key });
  if (keyExists) {
    await generateKey();
  } else {
    return key;
  }
}

// POST request to get a key
router.post('/', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  let key = '';
  if (!user) {
    key = await generateKey();

    const userToAdd = new User({
      email: req.body.email,
      key,
      keyCreatedAt: new Date(),
    });

    try {
      await userToAdd.save();
    } catch (error) {
      res.status(500).json({ message: 'Error adding new user.' });
    }
  } else {
    key = user.key;
  }
  res.status(200).json({ key });
});

module.exports = router;
