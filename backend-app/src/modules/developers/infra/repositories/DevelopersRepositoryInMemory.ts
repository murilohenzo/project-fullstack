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

  async findById(id: number): Promise<Developer | undefined> {
    const developer = this.developers.find((developer) => developer.id === id);
    return developer !== undefined ? developer : undefined;
  }

  async create(developer: InterfaceCreateDeveloperDTO): Promise<Developer> {
    const developerObj = new Developer();

    Object.assign(developerObj, { id: 1 }, developer);

    this.developers.push(developerObj);

    return developerObj;
  }

  async update(
    id: number,
    _developer: InterfaceCreateDeveloperDTO
  ): Promise<Developer | undefined> {
    const developer = this.developers.find((developer) => developer.id === id);

    if (developer !== undefined) {
      developer.age = _developer.age || developer.age;
      developer.birthDate = _developer.birthDate || developer.birthDate;
      developer.hobby = _developer.hobby || developer.hobby;
      developer.level = _developer.level || developer.level;
      developer.name = _developer.name || developer.name;
      developer.sex = _developer.sex || developer.sex;

      return developer;
    }
    return {} as Developer;
  }
}
