import { AppError } from "../../../../shared/errors/AppError";
import { PaginationLevelsUseCase } from "./index";
import { LevelsRepositoryInMemory } from "../../infra/repositories/LevelsRepositoryInMemory";

describe("PaginationLevelsUseCase", () => {
  it("should be able to pagination levels", async () => {
    const levelsRepositoryInMemory = new LevelsRepositoryInMemory();
    const levelService = new PaginationLevelsUseCase(levelsRepositoryInMemory);

    const levels = await levelService.execute(1, 1);

    expect(levels?.length).toEqual(1);
  });
});

describe("PaginationLevelsUseCaseHandleException", () => {
  it("should not be able to pagination levels", async () => {
    expect.assertions(1);
    try {
      const levelsRepositoryInMemory = new LevelsRepositoryInMemory();
      levelsRepositoryInMemory.clear();
      const levelService = new PaginationLevelsUseCase(
        levelsRepositoryInMemory
      );
      await levelService.execute(1, 1);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
