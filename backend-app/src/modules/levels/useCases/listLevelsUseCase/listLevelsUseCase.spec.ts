import { AppError } from "../../../../shared/errors/AppError";
import { LevelsRepositoryInMemory } from "../../infra/repositories/LevelsRepositoryInMemory";
import { ListLevelsUseCase } from "./index";

let levelsRepositoryInMemory: LevelsRepositoryInMemory;

describe("ListLevelsUseCase", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
  });

  it("should be able to list levels", async () => {
    const levelService = new ListLevelsUseCase(levelsRepositoryInMemory);

    const levels = await levelService.execute();

    expect(levels?.length).toEqual(1);
  });
});

describe("ListLevelsUseCaseHandleException", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
  });

  it("should not be able to list levels", async () => {
    const levelService = new ListLevelsUseCase(levelsRepositoryInMemory);
    levelsRepositoryInMemory.clear();

    expect.assertions(1);
    try {
      await levelService.execute();
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
