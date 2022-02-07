import { Repository, getRepository } from "typeorm";
import { Level } from "../../orm/entities/Level";
import { InterfaceLevelsRepository } from "../ILevelsRepository";

import { InterfaceCreateLevelDTO } from "../../../dtos/ICreateLevelDTO";
import { InterfaceLevelCount } from "../../orm/entities/LevelCount";

import { Queries } from "./queries";

export class LevelsRepository implements InterfaceLevelsRepository {
  private readonly ormRepository: Repository<Level>;

  constructor() {
    this.ormRepository = getRepository(Level);
  }

  async findAll(): Promise<InterfaceLevelCount[] | undefined> {
    const levels = await this.ormRepository.query(Queries.findAll());
    return levels;
  }

  async findById(id: number): Promise<InterfaceLevelCount | undefined> {
    const level = await this.ormRepository.findOne(id);
    return level;
  }

  async findByIdWithCountDevs(
    id: number
  ): Promise<InterfaceLevelCount[] | undefined> {
    const level: InterfaceLevelCount[] = await this.ormRepository.query(
      Queries.findById(id)
    );
    return level;
  }
  async findByName(name: string): Promise<Level | undefined> {
    const level = await this.ormRepository.findOne({
      where: { level: name },
    });
    return level;
  }

  async create(_level: InterfaceCreateLevelDTO): Promise<Level | undefined> {
    const level = this.ormRepository.create(_level);

    await this.ormRepository.save(level);

    return level;
  }

  async update(
    id: number,
    _level: InterfaceCreateLevelDTO
  ): Promise<Level | undefined> {
    const level = await this.ormRepository.save({
      id,
      ..._level,
    });

    return level;
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async search(name: string): Promise<InterfaceLevelCount[] | undefined> {
    const levels: Level[] = await this.ormRepository.query(
      Queries.search(name)
    );
    return levels;
  }

  async pagination(
    take: number,
    page: number
  ): Promise<InterfaceLevelCount[] | undefined> {
    const levels: InterfaceLevelCount[] = await this.ormRepository.query(
      Queries.pagination(take, page)
    );

    return levels;
  }
}
