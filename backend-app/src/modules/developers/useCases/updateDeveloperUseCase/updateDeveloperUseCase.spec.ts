/* eslint-disable import/no-unresolved */
import { InterfaceDevelopersRepository } from "../../infra/repositories/IDevelopersRepository";
import { DevelopersRepositoryInMemory } from "../../infra/repositories/DevelopersRepositoryInMemory";

import { LevelsRepositoryInMemory } from "../../../levels/infra/repositories/LevelsRepositoryInMemory";
import { InterfaceLevelsRepository } from "../../../levels/infra/repositories/ILevelsRepository";

import { CreateDeveloperUseCase } from "../createDeveloperUseCase";
import { UpdateDeveloperUseCase } from "./index";

import { AppError } from "../../../../shared/errors/AppError";

let levelsRepositoryInMemory: InterfaceLevelsRepository;
let developersRepositoryInMemory: InterfaceDevelopersRepository;
describe("UpdateDeveloperUseCase", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  beforeEach(async () => {
    const developerService = new CreateDeveloperUseCase(
      developersRepositoryInMemory,
      levelsRepositoryInMemory
    );

    await developerService.execute({
      level_id: 1,
      name: "John Doe",
      sex: "MALE",
      birth_date: new Date(),
      age: 21,
      hobby: "Assistir anime",
    });
  });
  it("should be able to update developer", async () => {
    const developerService = new UpdateDeveloperUseCase(
      developersRepositoryInMemory,
      levelsRepositoryInMemory
    );
    const developer = await developerService.execute(1, {
      level_id: 1,
      name: "John Doe",
      sex: "MALE",
      birth_date: new Date(),
      age: 22,
      hobby: "Assistir series",
    });
    expect(developer).toHaveProperty("level_id");
    expect(developer?.age).toEqual(22);
  });
});

describe("UpdateDeveloperUseCaseHandleExceptions", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  it("should not be able to update developer with level that does not exist", async () => {
    const developerService = new CreateDeveloperUseCase(
      developersRepositoryInMemory,
      levelsRepositoryInMemory
    );

    await developerService.execute({
      level_id: 1,
      name: "John Doe",
      sex: "MALE",
      birth_date: new Date(),
      age: 21,
      hobby: "Assistir anime",
    });

    expect.assertions(1);

    try {
      const developerService = new UpdateDeveloperUseCase(
        developersRepositoryInMemory,
        levelsRepositoryInMemory
      );
      await developerService.execute(1, {
        level_id: 5,
        name: "",
        sex: "",
        birth_date: new Date(),
        age: 0,
        hobby: "",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("shouldn't be able to update developer that doesn't exist", async () => {
    expect.assertions(1);

    try {
      const developerService = new UpdateDeveloperUseCase(
        developersRepositoryInMemory,
        levelsRepositoryInMemory
      );
      await developerService.execute(2, {
        level_id: 1,
        name: "",
        sex: "",
        birth_date: new Date(),
        age: 0,
        hobby: "",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
