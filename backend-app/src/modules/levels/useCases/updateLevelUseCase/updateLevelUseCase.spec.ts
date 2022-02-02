import { AppError } from "../../../../shared/errors/AppError";
import { LevelsRepositoryInMemory } from "../../infra/repositories/LevelsRepositoryInMemory";
import { CreateLevelUseCase } from "../createLevelUseCase";
import { UpdateLevelUseCase } from "./index";

let levelsRepositoryInMemory: LevelsRepositoryInMemory;

describe("UpdateLevelUseCase", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
  });

  beforeEach(async () => {
    const levelService = new CreateLevelUseCase(levelsRepositoryInMemory);

    await levelService.execute({ level: "JUNIOR" });
    await levelService.execute({ level: "PLENO" });
    await levelService.execute({ level: "SENIOR" });
    await levelService.execute({ level: "MASTER" });
  });

  it("should be able to update level", async () => {
    const levelService = new UpdateLevelUseCase(levelsRepositoryInMemory);

    const level = await levelService.execute(1, { level: "JUNIOR A" });

    expect(level).toHaveProperty("level");
    expect(level?.level).toEqual("JUNIOR A");
  });
});

describe("UpdateLevelUseCaseHandleExceptions", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
  });

  it("should not be able to upgrade level that doesn't exist", async () => {
    expect.assertions(1);
    try {
      const levelService = new UpdateLevelUseCase(levelsRepositoryInMemory);
      await levelService.execute(2, { level: "JUNIOR A" });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("should not be able to update the level that already exists", async () => {
    const levelService = new CreateLevelUseCase(levelsRepositoryInMemory);

    await levelService.execute({ level: "JUNIOR" });
    await levelService.execute({ level: "PLENO" });

    expect.assertions(1);
    try {
      const levelService = new UpdateLevelUseCase(levelsRepositoryInMemory);
      await levelService.execute(2, { level: "PLENO" });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
