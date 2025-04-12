import Hapi from "@hapi/hapi";
import users from "../../interface/http/api/users/index.js";
import config from "../../common/config.js";
import DomainErrorTranslator from "../../common/exceptions/DomainErrorTransaltor.js";
import ClientError from "../../common/exceptions/ClientError.js";

const createServer = async (container) => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
    debug: config.app.debug,
  });

  await server.register([
    {
      plugin: users,
      options: { container },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      const translatedError = DomainErrorTranslator.translate(response);

      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: "fail",
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      if (!translatedError.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: "error",
        message: "terjadi kegagalan pada server kami",
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });

  return server;
};

export default createServer;
