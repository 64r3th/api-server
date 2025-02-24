require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/cards');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/cards', cardRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));