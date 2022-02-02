import { AppError } from "../../../../shared/errors/AppError";
import { LevelsRepositoryInMemory } from "../../infra/repositories/LevelsRepositoryInMemory";
import { CreateLevelUseCase } from "../createLevelUseCase";
import { ListLevelsUseCase } from "./index";

let levelsRepositoryInMemory: LevelsRepositoryInMemory;

describe("ListLevelsUseCase", () => {
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

  it("should be able to list levels", async () => {
    const levelService = new ListLevelsUseCase(levelsRepositoryInMemory);

    const levels = await levelService.execute();

    expect(levels?.length).toBeGreaterThan(3);
  });
});

describe("ListLevelsUseCaseHandleException", () => {
  beforeAll(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
  });

  it("should not be able to list levels", async () => {
    const levelService = new ListLevelsUseCase(levelsRepositoryInMemory);

    expect.assertions(1);
    try {
      await levelService.execute();
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
