import { Inject, Injectable } from "@nestjs/common";
import { Developers } from "../domain/developers.entity";
import { ICreateDeveloperDTO } from "../dtos/create.developer.dto";
import { DevelopersRepository } from "../infra/repositories/developers.repository";

@Injectable()
export class CreateDeveloperUseCase {
  constructor(
    @Inject(DevelopersRepository)
    private developersRepository: DevelopersRepository
  ) {}

  async execute(requestDTO: ICreateDeveloperDTO): Promise<Developers> {
    console.log(requestDTO)
    return this.developersRepository.createDeveloper(requestDTO);
  }
}