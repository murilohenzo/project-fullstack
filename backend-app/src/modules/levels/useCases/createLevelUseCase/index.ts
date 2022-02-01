/* eslint-disable import/no-unresolved */
import { StatusCodes } from "http-status-codes";
import { Level } from "modules/levels/infra/orm/entities/Level";
import { InterfaceLevelsRepository } from "modules/levels/infra/repositories/ILevelsRepository";
import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { InterfaceCreateLevelDTO } from "../../dtos/ICreateLevelDTO";

@injectable()
export class CreateLevelUseCase {
  constructor(
    @inject("LevelsRepository")
    private readonly levelsRepository: InterfaceLevelsRepository
  ) {}

  async execute(level: InterfaceCreateLevelDTO): Promise<Level | undefined> {
    if (level.level) return this.levelsRepository.create(level);
    throw new AppError("O campo level eh obrigatorio");
  }
}
