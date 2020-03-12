const { floor, random } = Math;
const crypto = require('crypto');

const getRandomNumber = (min, max) => floor(random() * (max - min) + min);

const idProvider = () => {
  const hash = crypto.createHash('sha1').update(`${+new Date()}`);
  return hash.digest('hex').slice(0, 10);
};

const provideSourceColor = (req, res) => {
  const sessionId = req.app.locals.idProvider();
  res.cookie('session', sessionId);
  const games = req.app.locals.games;
  games.add(sessionId, getRandomNumber);
  res.json(games.getColors());
};

const redirectionToStart = function(req, res, next) {
  const { session } = req.cookies;
  if (!session) {
    return res.redirect('/');
  }
  next();
};

const responseToCheckColors = function(session, checkResult, games, res) {
  const codeColor = games.getCodeColor(session);
  checkResult.code = codeColor;
  games.delete(session);
  res.clearCookie('session');
};

const checkColors = function(req, res) {
  const { session } = req.cookies;
  const { colors } = req.body;
  if (!colors) {
    return res.status(400).send('Bad request');
  }
  const games = req.app.locals.games;
  const checkResult = games.checkColors(session, colors);
  if (checkResult.gameOver) {
    responseToCheckColors(session, checkResult, games, res);
  }
  res.json(checkResult);
};

module.exports = {
  provideSourceColor,
  redirectionToStart,
  checkColors,
  idProvider
};
