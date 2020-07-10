const http = require('http');
const { app } = require('./src/routes');
const server = http.createServer(app);

const main = function () {
  const { env } = process;
  const PORT = env.PORT || 8000;
  server.listen(PORT, () => process.stdout.write(`Listening at ${PORT}`));
};

main();
