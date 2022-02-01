import { DevelopersRepositoryInMemory } from "../../infra/repositories/DevelopersRepositoryInMemory";
import { CreateDeveloperUseCase } from "./index";

describe("CreateDeveloperUseCase", () => {
  it("should be able to create developer", async () => {
    const developersRepositoryInMemory = new DevelopersRepositoryInMemory();

    const developerService = new CreateDeveloperUseCase(
      developersRepositoryInMemory
    );

    const developer = await developerService.execute({
      level_id: 1,
      name: "John Doe",
      sex: "MALE",
      birth_date: new Date(),
      age: 21,
      hobby: "Assistir anime",
    });

    expect(developer).toHaveProperty("level_id");
    expect(developer?.age).toEqual(21);
  });
});
