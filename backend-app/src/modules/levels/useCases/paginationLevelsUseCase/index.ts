import "reflect-metadata";

import { injectable, inject } from "tsyringe";

import { StatusCodes } from "http-status-codes";
import { Level } from "../../infra/orm/entities/Level";
import { InterfaceLevelsRepository } from "../../infra/repositories/ILevelsRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class PaginationLevelsUseCase {
  constructor(
    @inject("LevelsRepository")
    private readonly levelsRepository: InterfaceLevelsRepository
  ) {}

  async execute(take: number, page: number): Promise<Level[] | undefined> {
    const levels = await this.levelsRepository.pagination(take, page);

    if (levels && levels.length > 0) return levels;

    throw new AppError(
      "Nao existe densenvolvedores na base para fazer a paginacao",
      StatusCodes.NOT_FOUND
    );
  }
}
