import { DevelopersRepositoryInMemory } from "../../infra/repositories/DevelopersRepositoryInMemory";
import { CreateDeveloperUseCase } from "./index";

describe("CreateDeveloperUseCase", () => {
  it("should be able to create developer", async () => {
    const developersRepositoryInMemory = new DevelopersRepositoryInMemory();

    const createDeveloper = new CreateDeveloperUseCase(
      developersRepositoryInMemory
    );

    const developer = await createDeveloper.execute({
      level: "JUNIOR",
      name: "John Doe",
      sex: "MALE",
      birthDate: new Date(),
      age: 21,
      hobby: "Assistir anime",
    });

    expect(developer).toHaveProperty("level");
    expect(developer?.age).toEqual(21);
  });
});
