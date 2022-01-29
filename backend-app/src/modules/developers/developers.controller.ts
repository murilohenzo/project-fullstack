// import { Response } from 'express';
import { Controller, Post, Body, HttpStatus, Res, Response, Logger, Get} from '@nestjs/common';
import { response } from 'express';
import { Developers } from './domain/developers.entity';
import { ICreateDeveloperDTO } from './dtos/create.developer.dto';
import { CreateDeveloperUseCase } from './useCases/create.developers.useCase';

@Controller('developers')
export class DevelopersController {
  constructor(
    private readonly createDeveloperUseCase: CreateDeveloperUseCase
    ) {}

    @Get("/hello")
    hello(@Res() response): Promise<Response> {
      return response.json("hello")
    }

    @Post("/new")
    async create(@Body() payload: ICreateDeveloperDTO, @Res() response): Promise<Response> {
        Logger.warn("entrou aqui")
        const developer = await this.createDeveloperUseCase.execute(payload);
        return response.json(developer);
    } 


}
