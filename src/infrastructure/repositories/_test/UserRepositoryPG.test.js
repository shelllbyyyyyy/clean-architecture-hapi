import UsersTableTestHelper from "../../../../test/UserTableTestHelper.js";
import InvariantError from "../../../common/exceptions/InvariantError.js";
import RegisterUser from "../../../domain/users/entities/RegisterUser.js";
import RegisteredUser from "../../../domain/users/entities/RegisteredUser.js";
import pool from "../../database/postgre/pool.js";
import UserRepositoryPG from "../UserRepositoryPG.js";

describe("UserRepositoryPG", () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("verifyAvailableUsername function", () => {
    it("should throw InvariantError when username not available", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: "dicoding" }); // memasukan user baru dengan username dicoding
      const userRepositoryPG = new UserRepositoryPG(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPG.verifyAvailableUsername("dicoding")
      ).rejects.toThrow(InvariantError);
    });

    it("should not throw InvariantError when username available", async () => {
      // Arrange
      const userRepositoryPG = new UserRepositoryPG(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPG.verifyAvailableUsername("dicoding")
      ).resolves.not.toThrow(InvariantError);
    });
  });

  describe("addUser function", () => {
    it("should persist register user", async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: "dicoding",
        password: "secret_password",
        fullname: "Dicoding Indonesia",
      });
      const fakeIdGenerator = () => "123"; // stub!
      const userRepositoryPG = new UserRepositoryPG(pool, fakeIdGenerator);

      // Action
      await userRepositoryPG.addUser(registerUser);

      // Assert
      const users = await UsersTableTestHelper.findUsersById("user-123");
      expect(users).toHaveLength(1);
    });

    it("should return registered user correctly", async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: "dicoding",
        password: "secret_password",
        fullname: "Dicoding Indonesia",
      });
      const fakeIdGenerator = () => "123"; // stub!
      const userRepositoryPG = new UserRepositoryPG(pool, fakeIdGenerator);

      // Action
      const registeredUser = await userRepositoryPG.addUser(registerUser);

      // Assert
      expect(registeredUser).toStrictEqual(
        new RegisteredUser({
          id: "user-123",
          username: "dicoding",
          fullname: "Dicoding Indonesia",
        })
      );
    });
  });
});
