/* eslint-disable import/no-unresolved */
import { InterfaceCreateDeveloperDTO } from "modules/developers/dtos/ICreateDeveloperDTO";
import { Developer } from "modules/developers/infra/orm/entities/Developer";
import { InterfaceDevelopersRepository } from "modules/developers/infra/repositories/IDevelopersRepository";
import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class CreateDeveloperUseCase {
  constructor(
    @inject("DevelopersRepository")
    private readonly developersRepository: InterfaceDevelopersRepository
  ) {}

  async execute(
    developer: InterfaceCreateDeveloperDTO
  ): Promise<Developer | undefined> {
    if (
      developer.name &&
      developer.sex &&
      developer.age &&
      developer.birth_date &&
      developer.hobby &&
      developer.level_id
    )
      return this.developersRepository.create(developer);
    throw new AppError("Todos os campos sao obrigatorios");
  }
}
