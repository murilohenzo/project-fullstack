/* eslint-disable import/no-unresolved */
import { InterfaceCreateDeveloperDTO } from "modules/developers/dtos/ICreateDeveloperDTO";
import { Developer } from "modules/developers/infra/orm/entities/Developer";
import { InterfaceDevelopersRepository } from "modules/developers/infra/repositories/IDevelopersRepository";
import { injectable, inject } from "tsyringe";

@injectable()
export class CreateDeveloperUseCase {
  constructor(
    @inject("DevelopersRepository")
    private readonly developersRepository: InterfaceDevelopersRepository
  ) {}

  execute(
    developer: InterfaceCreateDeveloperDTO
  ): Promise<Developer | undefined> {
    return this.developersRepository.create(developer);
  }
}
