import container from "./infrastructure/container.js";
import createServer from "./infrastructure/http/createServer.js";

const start = async () => {
  const server = await createServer(container);

  await server.start();
  console.log(`Server start at ${server.info.uri}`);
};

start();
