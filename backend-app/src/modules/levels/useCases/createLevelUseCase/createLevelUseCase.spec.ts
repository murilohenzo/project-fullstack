import { LevelsRepositoryInMemory } from "../../infra/repositories/LevelsRepositoryInMemory";
import { CreateLevelUseCase } from "./index";

describe("CreateDeveloperUseCase", () => {
  it("should be able to create developer", async () => {
    const levelsRepositoryInMemory = new LevelsRepositoryInMemory();

    const levelService = new CreateLevelUseCase(levelsRepositoryInMemory);

    const levelObj = await levelService.execute({
      level: "JUNIOR",
    });

    expect(levelObj).toHaveProperty("level");
    expect(levelObj?.level).toEqual("JUNIOR");
  });
});
