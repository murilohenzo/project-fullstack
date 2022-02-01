/* eslint-disable import/no-unresolved */
import { StatusCodes } from "http-status-codes";
import { injectable, inject } from "tsyringe";
import { Developer } from "../../infra/orm/entities/Developer";
import { InterfaceDevelopersRepository } from "../../infra/repositories/IDevelopersRepository";

import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class PaginationDevelopersUseCase {
  constructor(
    @inject("DevelopersRepository")
    private readonly developersRepository: InterfaceDevelopersRepository
  ) {}

  async execute(take: number, page: number): Promise<Developer[] | undefined> {
    const developers = await this.developersRepository.pagination(take, page);

    if (developers && developers.length > 0) return developers;

    throw new AppError(
      "Nao existe densenvolvedores na base para fazer a paginacao",
      StatusCodes.NO_CONTENT
    );
  }
}
