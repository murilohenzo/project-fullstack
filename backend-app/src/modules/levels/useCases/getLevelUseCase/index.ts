import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Level } from "../../infra/orm/entities/Level";
import { InterfaceLevelsRepository } from "../../infra/repositories/ILevelsRepository";

@injectable()
export class GetLevelUseCase {
  constructor(
    @inject("LevelsRepository")
    private readonly levelsRepository: InterfaceLevelsRepository
  ) {}

  async execute(id: number): Promise<Level | undefined> {
    const level = await this.levelsRepository.findById(id);

    if (!level)
      throw new AppError(
        "Nao foi possivel encontrar o nivel",
        StatusCodes.NOT_FOUND
      );

    return level;
  }
}
