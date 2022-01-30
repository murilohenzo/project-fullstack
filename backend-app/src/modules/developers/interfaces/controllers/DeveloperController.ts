import { Request, Response } from "express";
import { container } from "tsyringe";
import { StatusCodes } from "http-status-codes";

import { InterfaceCreateDeveloperDTO } from "../../dtos/ICreateDeveloperDTO";
import { CreateDeveloperUseCase } from "../../useCases/createDeveloperUseCase";

export class DeveloperController {
  async create(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      const payload: InterfaceCreateDeveloperDTO = request.body;
      const createDeveloperService = container.resolve(CreateDeveloperUseCase);
      const developer = await createDeveloperService.execute(payload);

      return response.status(201).json(developer);
    } catch (error: any) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
