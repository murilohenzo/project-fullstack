/* eslint-disable import/no-unresolved */
import { StatusCodes } from "http-status-codes";
import { injectable, inject } from "tsyringe";
import { Developer } from "../../infra/orm/entities/Developer";
import { InterfaceDevelopersRepository } from "../../infra/repositories/IDevelopersRepository";

import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class SearchDeveloperUseCase {
  constructor(
    @inject("DevelopersRepository")
    private readonly developersRepository: InterfaceDevelopersRepository
  ) {}

  async execute(name: string): Promise<Developer[] | undefined> {
    if (name) {
      const developers = await this.developersRepository.search(name);

      if (developers && developers.length > 0) {
        return developers;
      }
    }
    throw new AppError(
      "Nao existe densenvolvedores na base de dados",
      StatusCodes.NOT_FOUND
    );
  }
}
