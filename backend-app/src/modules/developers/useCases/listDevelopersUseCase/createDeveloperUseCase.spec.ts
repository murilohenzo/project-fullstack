/* eslint-disable import/no-unresolved */
import { InterfaceDevelopersRepository } from "modules/developers/infra/repositories/IDevelopersRepository";
import { DevelopersRepositoryInMemory } from "../../infra/repositories/DevelopersRepositoryInMemory";
import { CreateDeveloperUseCase } from "../createDeveloperUseCase";
import { ListDevelopersUseCase } from "./index";

import { AppError } from "../../../../shared/errors/AppError";

let developersRepositoryInMemory: InterfaceDevelopersRepository;
describe("ListDevelopersUseCase", () => {
  beforeAll(() => {
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  beforeEach(async () => {
    const createDeveloper = new CreateDeveloperUseCase(
      developersRepositoryInMemory
    );

    await createDeveloper.execute({
      level: "JUNIOR",
      name: "John Doe",
      sex: "MALE",
      birthDate: new Date(),
      age: 21,
      hobby: "Assistir anime",
    });
  });
  it("should be able to list developers", async () => {
    const listDevelopers = new ListDevelopersUseCase(
      developersRepositoryInMemory
    );
    const developers = await listDevelopers.execute();
    expect(developers?.[0]).toHaveProperty("level");
    expect(developers).toHaveLength(1);
  });
});

describe("ListDevelopersUseCaseHandleException", () => {
  beforeAll(() => {
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  it("should be not able to list developers", async () => {
    expect.assertions(1);

    try {
      const listDevelopers = new ListDevelopersUseCase(
        developersRepositoryInMemory
      );
      await listDevelopers.execute();
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
