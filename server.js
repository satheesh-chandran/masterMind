const { app } = require('./src/routes');

const main = function() {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => process.stdout.write(`Listening at ${PORT}`));
};

main();
