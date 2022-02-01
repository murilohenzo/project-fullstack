import { Repository, getRepository } from "typeorm";
import { Level } from "../../orm/entities/Level";
import { InterfaceLevelsRepository } from "../ILevelsRepository";

import { InterfaceCreateLevelDTO } from "../../../dtos/ICreateLevelDTO";

export class LevelsRepository implements InterfaceLevelsRepository {
  private readonly ormRepository: Repository<Level>;

  constructor() {
    this.ormRepository = getRepository(Level);
  }

  async create(_level: InterfaceCreateLevelDTO): Promise<Level | undefined> {
    const level = this.ormRepository.create(_level);

    await this.ormRepository.save(level);

    return level;
  }
}
