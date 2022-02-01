import { Request, Response } from "express";
import { container } from "tsyringe";
import { StatusCodes } from "http-status-codes";
import { CreateLevelUseCase } from "../../useCases/createLevelUseCase";
import { InterfaceCreateLevelDTO } from "../../dtos/ICreateLevelDTO";

export class LevelController {
  async create(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      const payload: InterfaceCreateLevelDTO = request.body;

      const levelService = container.resolve(CreateLevelUseCase);
      const level = await levelService.execute(payload);

      return response.status(StatusCodes.CREATED).json(level);
    } catch (error: any) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
