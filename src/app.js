const createServer = require("./main");

const start = async () => {
  const server = createServer();

  await server.start();
  console.log(`Server start at ${server.info.uri}`);
};

start();
