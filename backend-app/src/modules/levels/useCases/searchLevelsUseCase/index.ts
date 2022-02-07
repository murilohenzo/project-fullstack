/* eslint-disable import/no-unresolved */
import { StatusCodes } from "http-status-codes";
import { injectable, inject } from "tsyringe";
import { InterfaceLevelCount } from "../../infra/orm/entities/LevelCount";
import { InterfaceLevelsRepository } from "../../infra/repositories/ILevelsRepository";

import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class SearchLevelsUseCase {
  constructor(
    @inject("LevelsRepository")
    private readonly levelsRepository: InterfaceLevelsRepository
  ) {}

  async execute(name: string): Promise<InterfaceLevelCount[] | undefined> {
    if (name) {
      const levels = await this.levelsRepository.search(name);

      if (levels && levels.length > 0) {
        return levels;
      }
    }
    throw new AppError(
      "Nao existe niveis na base de dados",
      StatusCodes.NOT_FOUND
    );
  }
}
