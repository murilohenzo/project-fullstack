/* eslint-disable radix */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { StatusCodes } from "http-status-codes";

import { InterfaceCreateDeveloperDTO } from "../../dtos/ICreateDeveloperDTO";
import { CreateDeveloperUseCase } from "../../useCases/createDeveloperUseCase";
import { ListDevelopersUseCase } from "../../useCases/listDevelopersUseCase";
import { UpdateDeveloperUseCase } from "../../useCases/updateDeveloperUseCase";

export class DeveloperController {
  async create(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      const payload: InterfaceCreateDeveloperDTO = request.body;
      const createDeveloperService = container.resolve(CreateDeveloperUseCase);
      const developer = await createDeveloperService.execute(payload);

      return response.status(StatusCodes.CREATED).json(developer);
    } catch (error: any) {
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
      const listDevelopersService = container.resolve(ListDevelopersUseCase);
      const developers = await listDevelopersService.execute();

      return response.status(StatusCodes.OK).json(developers);
    } catch (error: any) {
      if (error.Statuscode) {
        return response
          .status(error.Statuscode)
          .json({ developers: [], message: error.message });
      }
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  async update(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;
      const payload: InterfaceCreateDeveloperDTO = request.body;
      const createDeveloperService = container.resolve(UpdateDeveloperUseCase);
      const developer = await createDeveloperService.execute(
        parseInt(id),
        payload
      );

      return response.status(StatusCodes.CREATED).json(developer);
    } catch (error: any) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
