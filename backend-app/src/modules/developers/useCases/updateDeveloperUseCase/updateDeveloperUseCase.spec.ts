/* eslint-disable import/no-unresolved */
import { InterfaceDevelopersRepository } from "../../infra/repositories/IDevelopersRepository";
import { DevelopersRepositoryInMemory } from "../../infra/repositories/DevelopersRepositoryInMemory";
import { CreateDeveloperUseCase } from "../createDeveloperUseCase";
import { UpdateDeveloperUseCase } from "./index";

import { AppError } from "../../../../shared/errors/AppError";

let developersRepositoryInMemory: InterfaceDevelopersRepository;
describe("UpdateDeveloperUseCase", () => {
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
  });
  it("should be able to update developer", async () => {
    const developerService = new UpdateDeveloperUseCase(
      developersRepositoryInMemory
    );
    const developer = await developerService.execute(1, {
      level: "PLENO",
      name: "John Doe",
      sex: "MALE",
      birthDate: new Date(),
      age: 22,
      hobby: "Assistir series",
    });
    expect(developer).toHaveProperty("level");
    expect(developer?.age).toEqual(22);
  });
});

describe("UpdateDeveloperUseCaseHandleException", () => {
  beforeAll(() => {
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  it("should be not able to list developers", async () => {
    expect.assertions(1);

    try {
      const developerService = new UpdateDeveloperUseCase(
        developersRepositoryInMemory
      );
      await developerService.execute(1, {
        level: "",
        name: "",
        sex: "",
        birthDate: new Date(),
        age: 0,
        hobby: "",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
