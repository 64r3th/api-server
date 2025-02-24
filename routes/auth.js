const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const usersPath = path.join(__dirname, '../data/users.json');

router.post('/getToken', async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = JSON.parse(await fs.readFile(usersPath));
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) return res.status(401).json({ errorMessage: 'Invalid credentials' });
    
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ errorMessage: 'Server error' });
  }
});

module.exports = router;