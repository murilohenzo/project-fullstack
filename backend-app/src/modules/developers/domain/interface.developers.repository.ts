import { ICreateDeveloperDTO } from "../dtos/create.developer.dto";
import { Developers } from "./developers.entity";

export interface IDeveloperRepository {
  create(developer: ICreateDeveloperDTO): Promise<Developers | undefined>
}