import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevelopersController } from './developers.controller';
import { CreateDeveloperUseCase } from './useCases/create.developers.useCase';

import { DevelopersRepository } from './infra/repositories/developers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DevelopersRepository])],
  controllers: [DevelopersController],
  providers: [
    CreateDeveloperUseCase,
  ],
})
export class DevelopersModule {}
