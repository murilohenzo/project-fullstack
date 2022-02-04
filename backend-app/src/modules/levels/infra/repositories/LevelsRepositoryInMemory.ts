import { InterfaceCreateLevelDTO } from "../../dtos/ICreateLevelDTO";
import { Level } from "../orm/entities/Level";
import { InterfaceLevelCount } from "../orm/entities/LevelCount";
import { InterfaceLevelsRepository } from "./ILevelsRepository";

interface InterfaceLevels extends Level {
  count_devs?: string;
}
export class LevelsRepositoryInMemory implements InterfaceLevelsRepository {
  private levels: InterfaceLevels[] = [
    {
      id: 1,
      level: "ESPECIALISTA",
      count_devs: "3",
    },
  ];

  async create(level: InterfaceCreateLevelDTO): Promise<Level | undefined> {
    const levelObj = new Level();

    const id = this.levels.length + 1;

    Object.assign(levelObj, { id }, level);

    this.levels.push(levelObj);

    return levelObj;
  }

  async findAll(): Promise<InterfaceLevelCount[] | undefined> {
    return this.levels;
  }
  async findById(id: number): Promise<InterfaceLevelCount | undefined> {
    const level = this.levels.find((level) => level.id === id);
    return level;
  }
  async findByName(name: string): Promise<Level | undefined> {
    const level = this.levels.find(({ level }) => level === name);
    return level;
  }
  findAllLevelsAndCountDevelopersAssociates(): Promise<
    InterfaceLevelCount[] | undefined
  > {
    throw new Error("Method not implemented.");
  }
  async findByIdWithCountDevs(
    id: number
  ): Promise<InterfaceLevelCount[] | undefined> {
    const level = this.levels.filter((level) => level.id === id);
    return level;
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
  async clear(): Promise<void> {
    this.levels.pop();
    this.levels.pop();
  }
}
