const Hapi = require("@hapi/hapi");
const config = require("./common/config");

const createServer = () => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
  });

  server.route([
    {
      method: "GET",
      path: "/",
      handler: (request) => {
        return "Helo world";
      },
    },
  ]);

  return server;
};

module.exports = createServer;
