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

    const id = this.developers.length + 1;

    Object.assign(developerObj, { id }, developer);

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
      developer.birth_date = _developer.birth_date || developer.birth_date;
      developer.hobby = _developer.hobby || developer.hobby;
      developer.level_id = _developer.level_id || developer.level_id;
      developer.name = _developer.name || developer.name;
      developer.sex = _developer.sex || developer.sex;

      return developer;
    }
    return {} as Developer;
  }

  async delete(id: number): Promise<void> {
    this.developers = this.developers.filter(
      (developer) => developer.id !== id
    );
  }

  async search(name: string): Promise<Developer[] | undefined> {
    const developers = this.developers.filter((dev) => dev.name === `${name}`);
    return developers;
  }

  async pagination(
    take: number,
    page: number
  ): Promise<Developer[] | undefined> {
    const developers = this.developers.slice((page - 1) * take, page * take);
    return developers;
  }
}
