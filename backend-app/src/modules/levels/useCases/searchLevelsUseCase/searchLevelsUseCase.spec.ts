/* eslint-disable import/no-unresolved */
import { LevelsRepositoryInMemory } from "../../infra/repositories/LevelsRepositoryInMemory";
import { InterfaceLevelsRepository } from "../../infra/repositories/ILevelsRepository";

import { SearchLevelsUseCase } from "./index";

import { AppError } from "../../../../shared/errors/AppError";

let levelsRepositoryInMemory: InterfaceLevelsRepository;
describe("SearchDeveloperUseCase", () => {
  it("should be able to search levels by name", async () => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();

    const developerService = new SearchLevelsUseCase(levelsRepositoryInMemory);
    const levels = await developerService.execute("ESPECIALISTA");
    expect(levels).toHaveLength(1);
  });
});

describe("SearchLevelsUseCaseHandleException", () => {
  it("should be not able to search developers by name", async () => {
    expect.assertions(1);
    try {
      levelsRepositoryInMemory = new LevelsRepositoryInMemory();
      const levelService = new SearchLevelsUseCase(levelsRepositoryInMemory);
      await levelService.execute({} as string);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
