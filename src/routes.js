const express = require('express');
const cookieParser = require('cookie-parser');

const { provideSourceColor } = require('./handlers');

const app = express();

app.use(cookieParser());
app.use(express.static('public', { index: 'game.html' }));

app.get('/sourceColor', provideSourceColor);

module.exports = { app };
