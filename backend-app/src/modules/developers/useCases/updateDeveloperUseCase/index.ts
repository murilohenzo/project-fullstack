/* eslint-disable import/no-unresolved */
import { StatusCodes } from "http-status-codes";
import { InterfaceCreateDeveloperDTO } from "modules/developers/dtos/ICreateDeveloperDTO";
import { Developer } from "modules/developers/infra/orm/entities/Developer";
import { InterfaceDevelopersRepository } from "modules/developers/infra/repositories/IDevelopersRepository";
import { InterfaceLevelsRepository } from "modules/levels/infra/repositories/ILevelsRepository";
import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class UpdateDeveloperUseCase {
  constructor(
    @inject("DevelopersRepository")
    private readonly developersRepository: InterfaceDevelopersRepository,
    @inject("LevelsRepository")
    private readonly levelsRepository: InterfaceLevelsRepository
  ) {}

  async execute(
    id: number,
    _developer: InterfaceCreateDeveloperDTO
  ): Promise<Developer | undefined> {
    const developerFound = await this.developersRepository.findById(id);

    if (!developerFound)
      throw new AppError(
        "Nao foi possivel encontrar o desenvolvedor",
        StatusCodes.NOT_FOUND
      );

    const levelFound = await this.levelsRepository.findById(
      _developer.level_id
    );

    if (!levelFound)
      throw new AppError(
        "O nivel nao existe na base de dados",
        StatusCodes.NOT_FOUND
      );

    const developer = await this.developersRepository.update(
      developerFound.id,
      _developer
    );

    return developer;
  }
}
