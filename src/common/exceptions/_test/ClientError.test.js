const ClientError = require("../ClientError");

describe("ClientError", () => {
  it("should throw error when directly use it", () => {
    const clientError = new ClientError("");

    expect(clientError.statusCode).toEqual(400);
    expect(clientError.message).toEqual("cannot instantiate abstract class");
    expect(clientError.name).toEqual("ClientError");
  });
});
