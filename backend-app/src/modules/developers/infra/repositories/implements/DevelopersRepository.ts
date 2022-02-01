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

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async search(name: string): Promise<Developer[] | undefined> {
    const developers: Developer[] = await this.ormRepository.query(
      `select * from developers where developers.name ilike '${name}%'`
    );
    return developers;
  }

  async pagination(
    take: number,
    page: number
  ): Promise<Developer[] | undefined> {
    const developers: Developer[] = await this.ormRepository.find({
      take,
      skip: take * (page - 1),
    });

    return developers;
  }
}
