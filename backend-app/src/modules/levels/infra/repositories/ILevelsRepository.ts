import { Level } from "../orm/entities/Level";
import { InterfaceCreateLevelDTO } from "../../dtos/ICreateLevelDTO";

export interface InterfaceLevelsRepository {
  create(level: InterfaceCreateLevelDTO): Promise<Level | undefined>;
}
