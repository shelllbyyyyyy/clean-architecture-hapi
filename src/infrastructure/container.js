import { createContainer } from "instances-container";

// external agency

import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import pool from "./database/postgre/pool.js";

// service (repository, helper, manager, etc)
import UserRepositoryPG from "./repositories/UserRepositoryPG.js";
import BcryptPasswordHash from "./security/BcryptPasswordHash.js";

// use case
import AddUserUseCase from "../application/use-case/AddUserUseCase.js";
import PasswordHash from "../application/security/PasswordHash.js";
import UserRepository from "../domain/users/repositories/UserRepository.js";

// creating container
const container = createContainer();

// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPG,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
]);

export default container;
