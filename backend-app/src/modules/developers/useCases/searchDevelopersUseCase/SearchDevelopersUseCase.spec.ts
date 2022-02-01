/* eslint-disable import/no-unresolved */
import { InterfaceDevelopersRepository } from "../../infra/repositories/IDevelopersRepository";
import { DevelopersRepositoryInMemory } from "../../infra/repositories/DevelopersRepositoryInMemory";
import { CreateDeveloperUseCase } from "../createDeveloperUseCase";
import { SearchDeveloperUseCase } from "./index";

import { AppError } from "../../../../shared/errors/AppError";

let developersRepositoryInMemory: InterfaceDevelopersRepository;
describe("SearchDeveloperUseCase", () => {
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
  });
  it("should be able to search developers by name", async () => {
    const developerService = new SearchDeveloperUseCase(
      developersRepositoryInMemory
    );
    const developers = await developerService.execute("John Doe");
    expect(developers).toHaveLength(2);
  });
});

describe("SearchDeveloperUseCaseHandleException", () => {
  beforeAll(() => {
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  it("should be not able to search developers by name", async () => {
    expect.assertions(1);

    try {
      const developerService = new SearchDeveloperUseCase(
        developersRepositoryInMemory
      );
      await developerService.execute({} as string);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
