const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

const cardsPath = path.join(__dirname, '../data/cards.json');

// Helper functions for file operations
const readCards = async () => JSON.parse(await fs.readFile(cardsPath));
const writeCards = async (cards) => fs.writeFile(cardsPath, JSON.stringify(cards, null, 2));

// Card endpoints
router.get('/', async (req, res) => {
  try {
    const cards = await readCards();
    const filteredCards = cards.filter(card => 
      Object.entries(req.query).every(([key, value]) => card[key] === value)
    );
    res.json(filteredCards);
  } catch (error) {
    res.status(500).json({ errorMessage: 'Failed to retrieve cards' });
  }
});

router.post('/create', authenticateToken, async (req, res) => {
  try {
    const cards = await readCards();
    if (cards.some(c => c.cardId === req.body.cardId)) {
      return res.status(400).json({ errorMessage: 'Card ID must be unique' });
    }
    cards.push(req.body);
    await writeCards(cards);
    res.status(201).json({ successMessage: 'Card created', card: req.body });
  } catch (error) {
    res.status(500).json({ errorMessage: 'Failed to create card' });
  }
});

// Other endpoints (PUT, DELETE, etc.) follow similar patterns...

module.exports = router;