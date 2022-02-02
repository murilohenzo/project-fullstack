import { InterfaceCreateLevelDTO } from "../../dtos/ICreateLevelDTO";
import { Level } from "../orm/entities/Level";
import { InterfaceLevelCount } from "../orm/entities/LevelCount";
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

  async findAll(): Promise<Level[] | undefined> {
    return this.levels;
  }
  async findById(id: number): Promise<Level | undefined> {
    const level = this.levels.find((level) => level.id === id);
    return level;
  }
  findAllLevelsAndCountDevelopersAssociates(): Promise<
    InterfaceLevelCount[] | undefined
  > {
    throw new Error("Method not implemented.");
  }
  findByIdLevelsAndCountDevelopersAssociates(
    id: number
  ): Promise<InterfaceLevelCount | undefined> {
    throw new Error("Method not implemented.");
  }
  async update(
    id: number,
    _level: InterfaceCreateLevelDTO
  ): Promise<Level | undefined> {
    const level = this.levels.find((level) => level.id === id);

    if (level !== undefined) {
      level.level = _level.level || level.level;

      return level;
    }
    return {} as Level;
  }
  async delete(id: number): Promise<void> {
    this.levels = this.levels.filter((level) => level.id !== id);
  }
  async search(name: string): Promise<Level[] | undefined> {
    const levels = this.levels.filter((level) => level.level === `${name}`);
    return levels;
  }
  async pagination(take: number, page: number): Promise<Level[] | undefined> {
    const levels = this.levels.slice((page - 1) * take, page * take);
    return levels;
  }
}
