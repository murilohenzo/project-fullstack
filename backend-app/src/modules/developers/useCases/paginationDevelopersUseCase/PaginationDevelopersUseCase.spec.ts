/* eslint-disable import/no-unresolved */
import { InterfaceDevelopersRepository } from "../../infra/repositories/IDevelopersRepository";
import { DevelopersRepositoryInMemory } from "../../infra/repositories/DevelopersRepositoryInMemory";
import { CreateDeveloperUseCase } from "../createDeveloperUseCase";
import { PaginationDevelopersUseCase } from "./index";

import { AppError } from "../../../../shared/errors/AppError";

let developersRepositoryInMemory: InterfaceDevelopersRepository;
describe("PaginationDevelopersUseCase", () => {
  beforeAll(() => {
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  beforeEach(async () => {
    const developerService = new CreateDeveloperUseCase(
      developersRepositoryInMemory
    );

    await developerService.execute({
      level_id: 1,
      name: "John Doe",
      sex: "MALE",
      birth_date: new Date(),
      age: 21,
      hobby: "Assistir anime",
    });

    await developerService.execute({
      level_id: 1,
      name: "John Doe",
      sex: "MALE",
      birth_date: new Date(),
      age: 21,
      hobby: "Assistir anime",
    });

    await developerService.execute({
      level_id: 1,
      name: "Mary",
      sex: "FEMALE",
      birth_date: new Date(),
      age: 21,
      hobby: "Assistir anime",
    });

    await developerService.execute({
      level_id: 1,
      name: "Mary",
      sex: "FEMALE",
      birth_date: new Date(),
      age: 21,
      hobby: "Assistir anime",
    });
  });
  it("should be able to pagination developers", async () => {
    const developerService = new PaginationDevelopersUseCase(
      developersRepositoryInMemory
    );
    expect(await developerService.execute(2, 1)).toHaveLength(2);
    expect(await developerService.execute(2, 2)).toHaveLength(2);
  });
});

describe("PaginationDevelopersUseCaseHandleException", () => {
  beforeAll(() => {
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  it("should be not able to pagination developers", async () => {
    expect.assertions(1);

    try {
      const developerService = new PaginationDevelopersUseCase(
        developersRepositoryInMemory
      );
      await developerService.execute(1, 1);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
