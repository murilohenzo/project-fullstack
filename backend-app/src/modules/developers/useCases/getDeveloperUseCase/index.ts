/* eslint-disable import/no-unresolved */
import { StatusCodes } from "http-status-codes";
import { Developer } from "modules/developers/infra/orm/entities/Developer";
import { InterfaceDevelopersRepository } from "modules/developers/infra/repositories/IDevelopersRepository";
import { injectable, inject } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class GetDeveloperUseCase {
  constructor(
    @inject("DevelopersRepository")
    private readonly developersRepository: InterfaceDevelopersRepository
  ) {}

  async execute(id: number): Promise<Developer | undefined> {
    const developer = await this.developersRepository.findById(id);

    if (!developer)
      throw new AppError(
        "Nao foi possivel encontrar o desenvolvedor",
        StatusCodes.NOT_FOUND
      );

    return developer;
  }
}
