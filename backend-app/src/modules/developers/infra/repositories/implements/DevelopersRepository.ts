import { Repository, getRepository } from "typeorm";
import { InterfaceDevelopersRepository } from "../IDevelopersRepository";
import { Developer } from "../../orm/entities/Developer";
import { InterfaceCreateDeveloperDTO } from "../../../dtos/ICreateDeveloperDTO";

import { Queries } from "./queries";

export class DevelopersRepository implements InterfaceDevelopersRepository {
  private ormRepository: Repository<Developer>;

  constructor() {
    this.ormRepository = getRepository(Developer);
  }
  async findAll(): Promise<Developer[] | undefined> {
    const developers = await this.ormRepository.query(
      Queries.findAllDevelopers()
    );
    return developers;
  }

  async findById(id: number): Promise<Developer | undefined> {
    const developer = await this.ormRepository.query(
      Queries.findByIdDevelopers(id)
    );
    // @ts-ignore
    return developer[0];
  }

  async create(
    _developer: InterfaceCreateDeveloperDTO
  ): Promise<Developer | undefined> {
    const developer = this.ormRepository.create(_developer);

    await this.ormRepository.save(developer);

    return developer;
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
