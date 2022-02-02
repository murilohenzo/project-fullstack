import { injectable, inject } from "tsyringe";

import { StatusCodes } from "http-status-codes";
import { Level } from "../../infra/orm/entities/Level";
import { InterfaceCreateLevelDTO } from "../../dtos/ICreateLevelDTO";
import { InterfaceLevelsRepository } from "../../infra/repositories/ILevelsRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class UpdateLevelUseCase {
  constructor(
    @inject("LevelsRepository")
    private readonly levelsRepository: InterfaceLevelsRepository
  ) {}

  async execute(
    id: number,
    { level }: InterfaceCreateLevelDTO
  ): Promise<Level | undefined> {
    const levelFound = await this.levelsRepository.findById(id);

    if (!levelFound)
      throw new AppError(
        "O nivel nao existe na base de dados",
        StatusCodes.NOT_FOUND
      );

    const existsLevel = await this.levelsRepository.findByName(level);

    if (existsLevel) throw new AppError("O nivel ja existe na base de dados");

    const _level = await this.levelsRepository.update(levelFound.id, {
      level,
    });

    return _level;
  }
}
