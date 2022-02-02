/* eslint-disable radix */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { StatusCodes } from "http-status-codes";
import { InterfaceCreateLevelDTO } from "../../dtos/ICreateLevelDTO";

import { CreateLevelUseCase } from "../../useCases/createLevelUseCase";
import { ListLevelsUseCase } from "../../useCases/listLevelsUseCase";
import { GetLevelUseCase } from "../../useCases/getLevelUseCase";

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
      if (error.statusCode) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
  async findAll(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      const levelService = container.resolve(ListLevelsUseCase);
      const levels = await levelService.execute();

      return response.status(StatusCodes.OK).json(levels);
    } catch (error: any) {
      if (error.statusCode) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
  async findById(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;

      const levelService = container.resolve(GetLevelUseCase);
      const levels = await levelService.execute(parseInt(id));

      return response.status(StatusCodes.OK).json(levels);
    } catch (error: any) {
      if (error.statusCode) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
