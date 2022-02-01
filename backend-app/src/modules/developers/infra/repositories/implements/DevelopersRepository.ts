import { Repository, getRepository } from "typeorm";
import { InterfaceDevelopersRepository } from "../IDevelopersRepository";
import { Developer } from "../../orm/entities/Developer";
import { InterfaceCreateDeveloperDTO } from "../../../dtos/ICreateDeveloperDTO";

export class DevelopersRepository implements InterfaceDevelopersRepository {
  private ormRepository: Repository<Developer>;

  constructor() {
    this.ormRepository = getRepository(Developer);
  }
  async findAll(): Promise<Developer[] | undefined> {
    const developers = await this.ormRepository.find();
    return developers;
  }

  async findById(id: number): Promise<Developer | undefined> {
    const developer = await this.ormRepository.findOne(id);
    return developer;
  }

  async create(
    developer: InterfaceCreateDeveloperDTO
  ): Promise<Developer | undefined> {
    const developerObj = this.ormRepository.create(developer);

    await this.ormRepository.save(developerObj);

    return developerObj;
  }

  async update(
    id: number,
    _developer: InterfaceCreateDeveloperDTO
  ): Promise<Developer | undefined> {
    const developer = await this.ormRepository.save({
      id,
      ..._developer,
    });

    return developer;
  }
}
