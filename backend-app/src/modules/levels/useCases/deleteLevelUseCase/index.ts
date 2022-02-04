/* eslint-disable radix */
import { injectable, inject } from "tsyringe";

import { StatusCodes } from "http-status-codes";
import { InterfaceLevelsRepository } from "../../infra/repositories/ILevelsRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class DeleteLevelUseCase {
  constructor(
    @inject("LevelsRepository")
    private readonly levelsRepository: InterfaceLevelsRepository
  ) {}

  async execute(id: number): Promise<void> {
    const levelFound = await this.levelsRepository.findById(id);

    if (!levelFound)
      throw new AppError(
        "O nivel nao existe na base de dados",
        StatusCodes.NOT_FOUND
      );

    const existsLevel = await this.levelsRepository.findByIdWithCountDevs(id);

    if (
      existsLevel &&
      existsLevel.length > 0 &&
      // @ts-ignore
      parseInt(existsLevel[0]?.count_devs) > 0
    )
      throw new AppError(
        "O nivel nao pode ser deletado, pois existe um ou mais desenvolvedores associados",
        StatusCodes.UNAUTHORIZED
      );

    await this.levelsRepository.delete(id);
  }
}
