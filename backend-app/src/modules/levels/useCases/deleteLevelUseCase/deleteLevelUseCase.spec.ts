import { AppError } from "../../../../shared/errors/AppError";
import { LevelsRepositoryInMemory } from "../../infra/repositories/LevelsRepositoryInMemory";
import { CreateLevelUseCase } from "../createLevelUseCase";
import { DeleteLevelUseCase } from "./index";

import { GetLevelUseCase } from "../getLevelUseCase";

let levelsRepositoryInMemory: LevelsRepositoryInMemory;

describe("DeleteLevelUseCase", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
  });

  it("should be able to delete level", async () => {
    const createLevelService = new CreateLevelUseCase(levelsRepositoryInMemory);
    await createLevelService.execute({ level: "PLENO" });

    const deleteLevelService = new DeleteLevelUseCase(levelsRepositoryInMemory);
    await deleteLevelService.execute(2);

    expect.assertions(1);
    try {
      const levelService = new GetLevelUseCase(levelsRepositoryInMemory);
      await levelService.execute(3);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});

describe("DeleteLevelUseCaseHandleExceptions", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
  });

  it("should not be able to delete the level that does not exist ", async () => {
    expect.assertions(1);
    try {
      const levelService = new DeleteLevelUseCase(levelsRepositoryInMemory);
      await levelService.execute(10);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("must not be able to delete the level that has more than one developer associate ", async () => {
    expect.assertions(1);
    try {
      const levelService = new DeleteLevelUseCase(levelsRepositoryInMemory);
      await levelService.execute(1);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
