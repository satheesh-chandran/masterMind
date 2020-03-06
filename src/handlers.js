const crypto = require('crypto');
const { Games } = require('./games');

const games = new Games();

const idProvider = () =>
  crypto
    .createHash('sha1')
    .update(`${+new Date()}`)
    .digest('hex')
    .slice(0, 10);

const provideSourceColor = (req, res) => {
  const sessionId = idProvider();
  res.cookie('session', sessionId);
  games.add(sessionId);
  res.json(games.getColors());
};

const redirectionToStart = function(req, res, next) {
  const { session } = req.cookies;
  if (!session) return res.redirect('/');
  next();
};

const checkColors = function(req, res) {
  const { session } = req.cookies;
  const { colors } = req.body;
  res.json(games.checkColors(session, colors));
};

module.exports = {
  provideSourceColor,
  redirectionToStart,
  checkColors
};
