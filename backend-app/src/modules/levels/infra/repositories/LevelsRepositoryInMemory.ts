import { InterfaceCreateLevelDTO } from "../../dtos/ICreateLevelDTO";
import { Level } from "../orm/entities/Level";
import { InterfaceLevelsRepository } from "./ILevelsRepository";

export class LevelsRepositoryInMemory implements InterfaceLevelsRepository {
  private levels: Level[] = [];

  async create(level: InterfaceCreateLevelDTO): Promise<Level | undefined> {
    const levelObj = new Level();

    const id = this.levels.length + 1;

    Object.assign(levelObj, { id }, level);

    this.levels.push(levelObj);

    return levelObj;
  }
}
