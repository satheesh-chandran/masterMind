const express = require('express');
const cookieParser = require('cookie-parser');

const {
  provideSourceColor,
  redirectionToStart,
  checkColors
} = require('./handlers');

const app = express();

app.use(cookieParser());
app.use(express.static('public', { index: 'game.html' }));
app.get('/sourceColor', provideSourceColor);
app.use(redirectionToStart);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/submitColors', checkColors);

module.exports = { app };
