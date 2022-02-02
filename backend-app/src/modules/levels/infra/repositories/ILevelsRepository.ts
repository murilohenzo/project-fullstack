import { Level } from "../orm/entities/Level";
import { InterfaceLevelCount } from "../orm/entities/LevelCount";
import { InterfaceCreateLevelDTO } from "../../dtos/ICreateLevelDTO";

export interface InterfaceLevelsRepository {
  create(level: InterfaceCreateLevelDTO): Promise<Level | undefined>;
  findAll(): Promise<Level[] | undefined>;
  findById(id: number): Promise<Level | undefined>;
  findAllLevelsAndCountDevelopersAssociates(): Promise<
    InterfaceLevelCount[] | undefined
  >;
  findByIdLevelsAndCountDevelopersAssociates(
    id: number
  ): Promise<InterfaceLevelCount | undefined>;
  update(
    id: number,
    level: InterfaceCreateLevelDTO
  ): Promise<Level | undefined>;
  delete(id: number): Promise<void>;
  search(name: string): Promise<Level[] | undefined>;
  pagination(take: number, page: number): Promise<Level[] | undefined>;
}
