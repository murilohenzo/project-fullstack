/* eslint-disable import/no-unresolved */
import { StatusCodes } from "http-status-codes";
import { InterfaceCreateDeveloperDTO } from "modules/developers/dtos/ICreateDeveloperDTO";
import { Developer } from "modules/developers/infra/orm/entities/Developer";
import { InterfaceDevelopersRepository } from "modules/developers/infra/repositories/IDevelopersRepository";
import { InterfaceLevelsRepository } from "modules/levels/infra/repositories/ILevelsRepository";
import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class CreateDeveloperUseCase {
  constructor(
    @inject("DevelopersRepository")
    private readonly developersRepository: InterfaceDevelopersRepository,
    @inject("LevelsRepository")
    private readonly levelsRepository: InterfaceLevelsRepository
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
    ) {
      const level = await this.levelsRepository.findById(developer.level_id);
      if (!level)
        throw new AppError(
          "O nivel nao existe na base de dados",
          StatusCodes.NOT_FOUND
        );
      return this.developersRepository.create(developer);
    }
    throw new AppError("Todos os campos sao obrigatorios");
  }
}
