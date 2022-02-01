import { InterfaceCreateDeveloperDTO } from "../../dtos/ICreateDeveloperDTO";
import { Developer } from "../orm/entities/Developer";

export interface InterfaceDevelopersRepository {
  create(
    developer: InterfaceCreateDeveloperDTO
  ): Promise<Developer | undefined>;
  findAll(): Promise<Developer[] | undefined>;
  findById(id: number): Promise<Developer | undefined>;
  update(
    id: number,
    developer: InterfaceCreateDeveloperDTO
  ): Promise<Developer | undefined>;
}
