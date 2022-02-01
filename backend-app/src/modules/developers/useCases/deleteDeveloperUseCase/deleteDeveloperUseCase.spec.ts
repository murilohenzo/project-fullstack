/* eslint-disable import/no-unresolved */
import { InterfaceDevelopersRepository } from "../../infra/repositories/IDevelopersRepository";
import { DevelopersRepositoryInMemory } from "../../infra/repositories/DevelopersRepositoryInMemory";
import { CreateDeveloperUseCase } from "../createDeveloperUseCase";
import { DeleteDeveloperUseCase } from "./index";
import { ListDevelopersUseCase } from "../listDevelopersUseCase";

import { AppError } from "../../../../shared/errors/AppError";

let developersRepositoryInMemory: InterfaceDevelopersRepository;
describe("DeleteDeveloperUseCase", () => {
  beforeAll(() => {
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  beforeEach(async () => {
    const developerService = new CreateDeveloperUseCase(
      developersRepositoryInMemory
    );

    await developerService.execute({
      level: "JUNIOR",
      name: "John Doe",
      sex: "MALE",
      birthDate: new Date(),
      age: 21,
      hobby: "Assistir anime",
    });

    await developerService.execute({
      level: "JUNIOR",
      name: "John Doe",
      sex: "MALE",
      birthDate: new Date(),
      age: 21,
      hobby: "Assistir anime",
    });
  });

  it("should be able to delete developer", async () => {
    const developerService = new DeleteDeveloperUseCase(
      developersRepositoryInMemory
    );
    await developerService.execute(1);

    const listDevelopers = new ListDevelopersUseCase(
      developersRepositoryInMemory
    );

    const developers = await listDevelopers.execute();

    expect(developers).toHaveLength(1);
  });
});

describe("DeleteDeveloperUseCaseHandleException", () => {
  beforeAll(() => {
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  it("should be not able to delete developer", async () => {
    expect.assertions(1);

    try {
      const developerService = new DeleteDeveloperUseCase(
        developersRepositoryInMemory
      );
      await developerService.execute(10);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
