/* eslint-disable import/no-unresolved */
import { InterfaceDevelopersRepository } from "../../infra/repositories/IDevelopersRepository";
import { DevelopersRepositoryInMemory } from "../../infra/repositories/DevelopersRepositoryInMemory";
import { CreateDeveloperUseCase } from "../createDeveloperUseCase";
import { GetDeveloperUseCase } from "./index";

import { AppError } from "../../../../shared/errors/AppError";

let developersRepositoryInMemory: InterfaceDevelopersRepository;
describe("GetDeveloperUseCase", () => {
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
  it("should be able to get developer", async () => {
    const developerService = new GetDeveloperUseCase(
      developersRepositoryInMemory
    );
    const developers = await developerService.execute(1);
    expect(developers).toHaveProperty("level");
    expect(developers?.id).toEqual(1);
  });
});

describe("GetDeveloperUseCaseHandleException", () => {
  beforeAll(() => {
    developersRepositoryInMemory = new DevelopersRepositoryInMemory();
  });

  it("should be not able to get developer", async () => {
    expect.assertions(1);

    try {
      const developerService = new GetDeveloperUseCase(
        developersRepositoryInMemory
      );
      await developerService.execute(10);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
