import { Level } from "../../infra/orm/entities/Level";
import { AppError } from "../../../../shared/errors/AppError";
import { LevelsRepositoryInMemory } from "../../infra/repositories/LevelsRepositoryInMemory";
import { CreateLevelUseCase } from "./index";

describe("CreateLevelUseCase", () => {
  it("should be able to create level", async () => {
    const levelsRepositoryInMemory = new LevelsRepositoryInMemory();

    const levelService = new CreateLevelUseCase(levelsRepositoryInMemory);

    const levelObj = await levelService.execute({
      level: "JUNIOR",
    });

    expect(levelObj).toHaveProperty("level");
    expect(levelObj?.level).toEqual("JUNIOR");
  });
});

describe("CreateLevelUseCaseHandleExceptions", () => {
  it("should not be able to create level with empty field", async () => {
    const levelsRepositoryInMemory = new LevelsRepositoryInMemory();

    const levelService = new CreateLevelUseCase(levelsRepositoryInMemory);

    expect.assertions(1);

    try {
      await levelService.execute({} as Level);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
  it("should not be able to create level that already exist", async () => {
    const levelsRepositoryInMemory = new LevelsRepositoryInMemory();

    const levelService = new CreateLevelUseCase(levelsRepositoryInMemory);

    await levelService.execute({
      level: "JUNIOR",
    });

    expect.assertions(1);

    try {
      await levelService.execute({
        level: "JUNIOR",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
