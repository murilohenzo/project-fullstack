import { AppError } from "../../../../shared/errors/AppError";
import { DevelopersRepositoryInMemory } from "../../infra/repositories/DevelopersRepositoryInMemory";
import { InterfaceDevelopersRepository } from "../../infra/repositories/IDevelopersRepository";

import { LevelsRepositoryInMemory } from "../../../levels/infra/repositories/LevelsRepositoryInMemory";
import { InterfaceLevelsRepository } from "../../../levels/infra/repositories/ILevelsRepository";

import { CreateDeveloperUseCase } from "./index";
import { CreateLevelUseCase } from "../../../levels/useCases/createLevelUseCase";
import { Developer } from "../../infra/orm/entities/Developer";

let levelsRepositoryInMemory: InterfaceLevelsRepository;
let developersRepositoryInMemory: InterfaceDevelopersRepository;
describe("CreateDeveloperUseCase", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  beforeEach(async () => {
    const levelService = new CreateLevelUseCase(levelsRepositoryInMemory);

    await levelService.execute({
      level: "JUNIOR",
    });
  });

  it("should be able to create developer", async () => {
    const developerService = new CreateDeveloperUseCase(
      developersRepositoryInMemory,
      levelsRepositoryInMemory
    );

    const developer = await developerService.execute({
      level_id: 1,
      name: "John Doe",
      sex: "MALE",
      birth_date: new Date(),
      age: 21,
      hobby: "Assistir anime",
    });

    expect(developer).toHaveProperty("level_id");
    expect(developer?.age).toEqual(21);
  });
});

describe("CreateDeveloperUseCaseHandleExceptions", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  it("shouldn't be able to create developer with level that doesn't exist", async () => {
    const levelService = new CreateLevelUseCase(levelsRepositoryInMemory);

    await levelService.execute({
      level: "JUNIOR",
    });

    const developerService = new CreateDeveloperUseCase(
      developersRepositoryInMemory,
      levelsRepositoryInMemory
    );

    expect.assertions(1);

    try {
      await developerService.execute({
        level_id: 2,
        name: "John Doe",
        sex: "MALE",
        birth_date: new Date(),
        age: 21,
        hobby: "Assistir anime",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("shouldn't be able to create developer with empty fields", async () => {
    const developerService = new CreateDeveloperUseCase(
      developersRepositoryInMemory,
      levelsRepositoryInMemory
    );

    expect.assertions(1);

    try {
      await developerService.execute({} as Developer);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
