const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.static('public', { index: 'game.html' }));

module.exports = { app };
