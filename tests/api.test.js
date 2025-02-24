const request = require('supertest');
const app = require('../app');
const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');

const cardsPath = path.join(__dirname, '../data/cards.json');
const usersPath = path.join(__dirname, '../data/users.json');

describe('Card Game API', () => {
  let token;
  
  beforeAll(async () => {
    // Setup test data
    await fs.writeFile(usersPath, JSON.stringify([{ username: 'test', password: 'test' }]));
    token = jwt.sign({ username: 'test' }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    // Cleanup test files
    await fs.unlink(usersPath);
    await fs.unlink(cardsPath);
  });

  describe('Authentication', () => {
    test('POST /auth/getToken returns valid token', async () => {
      const res = await request(app)
        .post('/auth/getToken')
        .send({ username: 'test', password: 'test' });
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
    });
  });

  // Add more test cases for other endpoints
});