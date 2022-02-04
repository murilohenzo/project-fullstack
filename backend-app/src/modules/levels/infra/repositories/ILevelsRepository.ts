import { Level } from "../orm/entities/Level";
import { InterfaceLevelCount } from "../orm/entities/LevelCount";
import { InterfaceCreateLevelDTO } from "../../dtos/ICreateLevelDTO";

export interface InterfaceLevelsRepository {
  create(level: InterfaceCreateLevelDTO): Promise<Level | undefined>;
  findAll(): Promise<InterfaceLevelCount[] | undefined>;
  findById(id: number): Promise<Level | undefined>;
  findByIdWithCountDevs(id: number): Promise<InterfaceLevelCount[] | undefined>;
  findByName(name: string): Promise<Level | undefined>;
  update(
    id: number,
    level: InterfaceCreateLevelDTO
  ): Promise<Level | undefined>;
  delete(id: number): Promise<void>;
  search(name: string): Promise<Level[] | undefined>;
  pagination(
    take: number,
    page: number
  ): Promise<InterfaceLevelCount[] | undefined>;
}
