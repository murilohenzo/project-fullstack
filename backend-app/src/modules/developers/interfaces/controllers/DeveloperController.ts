/* eslint-disable radix */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { StatusCodes } from "http-status-codes";

import { InterfaceCreateDeveloperDTO } from "../../dtos/ICreateDeveloperDTO";
import { CreateDeveloperUseCase } from "../../useCases/createDeveloperUseCase";
import { ListDevelopersUseCase } from "../../useCases/listDevelopersUseCase";
import { UpdateDeveloperUseCase } from "../../useCases/updateDeveloperUseCase";
import { GetDeveloperUseCase } from "../../useCases/getDeveloperUseCase";
import { DeleteDeveloperUseCase } from "../../useCases/deleteDeveloperUseCase";
import { SearchDeveloperUseCase } from "../../useCases/searchDevelopersUseCase";
import { PaginationDevelopersUseCase } from "../../useCases/paginationDevelopersUseCase";

export class DeveloperController {
  async create(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      const payload: InterfaceCreateDeveloperDTO = request.body;
      const developerService = container.resolve(CreateDeveloperUseCase);
      const developer = await developerService.execute(payload);

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
      const developerService = container.resolve(ListDevelopersUseCase);
      const developers = await developerService.execute();

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

  async findById(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;

      const developerService = container.resolve(GetDeveloperUseCase);
      const developers = await developerService.execute(parseInt(id));

      return response.status(StatusCodes.OK).json(developers);
    } catch (error: any) {
      if (error.Statuscode) {
        return response
          .status(error.Statuscode)
          .json({ developer: {}, message: error.message });
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
      const developerService = container.resolve(UpdateDeveloperUseCase);
      const developer = await developerService.execute(parseInt(id), payload);

      return response.status(StatusCodes.CREATED).json(developer);
    } catch (error: any) {
      if (error.Statuscode) {
        return response
          .status(error.Statuscode)
          .json({ developer: {}, message: error.message });
      }
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  async delete(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;

      const developerService = container.resolve(DeleteDeveloperUseCase);
      const developers = await developerService.execute(parseInt(id));

      return response
        .status(StatusCodes.OK)
        .json({ message: "Desenvolvedor deletado com sucesso." });
    } catch (error: any) {
      if (error.Statuscode) {
        return response
          .status(error.Statuscode)
          .json({ message: error.message });
      }
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  async search(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      const { name } = request.query;

      const developerService = container.resolve(SearchDeveloperUseCase);
      // @ts-ignore
      const developers = await developerService.execute(name);

      return response.status(StatusCodes.OK).json(developers);
    } catch (error: any) {
      if (error.Statuscode) {
        return response
          .status(error.Statuscode)
          .json({ developer: {}, message: error.message });
      }
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  async pagination(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      const { take, page } = request.body;

      const developerService = container.resolve(PaginationDevelopersUseCase);
      // @ts-ignore
      const developers = await developerService.execute(take, page);

      return response.status(StatusCodes.OK).json(developers);
    } catch (error: any) {
      if (error.Statuscode) {
        return response
          .status(error.Statuscode)
          .json({ developer: {}, message: error.message });
      }
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
