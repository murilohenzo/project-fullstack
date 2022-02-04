import { AppError } from "../../../../shared/errors/AppError";
import { LevelsRepositoryInMemory } from "../../infra/repositories/LevelsRepositoryInMemory";
import { GetLevelUseCase } from "./index";

let levelsRepositoryInMemory: LevelsRepositoryInMemory;

describe("GetLevelUseCase", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
  });

  it("should be able to get level", async () => {
    const levelService = new GetLevelUseCase(levelsRepositoryInMemory);

    const level = await levelService.execute(1);

    expect(level).toHaveProperty("level");
    expect(level?.level).toEqual("ESPECIALISTA");
  });
});

describe("GetLevelUseCaseHandleException", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
  });

  it("should not be able to get level", async () => {
    const levelService = new GetLevelUseCase(levelsRepositoryInMemory);

    expect.assertions(1);
    try {
      await levelService.execute(3);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
