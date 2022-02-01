/* eslint-disable import/no-unresolved */
import { StatusCodes } from "http-status-codes";
import { Developer } from "modules/developers/infra/orm/entities/Developer";
import { InterfaceDevelopersRepository } from "modules/developers/infra/repositories/IDevelopersRepository";
import { injectable, inject } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class ListDevelopersUseCase {
  constructor(
    @inject("DevelopersRepository")
    private readonly developersRepository: InterfaceDevelopersRepository
  ) {}

  async execute(): Promise<Developer[] | undefined> {
    const developers = await this.developersRepository.findAll();

    if (developers && developers.length > 0) {
      return developers;
    }
    throw new AppError(
      "Nao existe densenvolvedores na base",
      StatusCodes.NO_CONTENT
    );
  }
}
