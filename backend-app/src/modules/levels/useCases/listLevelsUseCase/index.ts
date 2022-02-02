import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Level } from "../../infra/orm/entities/Level";
import { InterfaceLevelsRepository } from "../../infra/repositories/ILevelsRepository";

@injectable()
export class ListLevelsUseCase {
  constructor(
    @inject("LevelsRepository")
    private readonly levelsRepository: InterfaceLevelsRepository
  ) {}

  async execute(): Promise<Level[] | undefined> {
    const levels = await this.levelsRepository.findAll();

    if (levels && levels.length > 0) return levels;

    throw new AppError("Nao existe niveis na base", StatusCodes.NO_CONTENT);
  }
}
