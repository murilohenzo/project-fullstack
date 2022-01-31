import { InterfaceCreateDeveloperDTO } from "../../dtos/ICreateDeveloperDTO";
import { Developer } from "../orm/entities/Developer";
import { InterfaceDevelopersRepository } from "./IDevelopersRepository";

export class DevelopersRepositoryInMemory
  implements InterfaceDevelopersRepository
{
  private developers: Developer[] = [];

  async findAll(): Promise<Developer[] | undefined> {
    return this.developers;
  }

  async create(developer: InterfaceCreateDeveloperDTO): Promise<Developer> {
    const developerObj = new Developer();

    Object.assign(developerObj, { id: 1 }, developer);

    this.developers.push(developerObj);

    return developerObj;
  }
}
