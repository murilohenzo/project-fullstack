/* eslint-disable import/no-unresolved */
import { InterfaceDevelopersRepository } from "../../infra/repositories/IDevelopersRepository";
import { DevelopersRepositoryInMemory } from "../../infra/repositories/DevelopersRepositoryInMemory";

import { LevelsRepositoryInMemory } from "../../../levels/infra/repositories/LevelsRepositoryInMemory";
import { InterfaceLevelsRepository } from "../../../levels/infra/repositories/ILevelsRepository";
import { CreateLevelUseCase } from "../../../levels/useCases/createLevelUseCase";

import { CreateDeveloperUseCase } from "../createDeveloperUseCase";
import { SearchDevelopersUseCase } from "./index";

import { AppError } from "../../../../shared/errors/AppError";

let levelsRepositoryInMemory: InterfaceLevelsRepository;
let developersRepositoryInMemory: InterfaceDevelopersRepository;
describe("SearchDevelopersUseCase", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  beforeEach(async () => {
    const developerService = new CreateDeveloperUseCase(
      developersRepositoryInMemory,
      levelsRepositoryInMemory
    );

    const levelService = new CreateLevelUseCase(levelsRepositoryInMemory);

    await levelService.execute({
      level: "JUNIOR",
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
    const developerService = new SearchDevelopersUseCase(
      developersRepositoryInMemory
    );
    const developers = await developerService.execute("John Doe");
    expect(developers).toHaveLength(2);
  });
});

describe("SearchDevelopersUseCaseHandleException", () => {
  beforeAll(() => {
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  it("should be not able to search developers by name", async () => {
    expect.assertions(1);

    try {
      const developerService = new SearchDevelopersUseCase(
        developersRepositoryInMemory
      );
      await developerService.execute({} as string);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
