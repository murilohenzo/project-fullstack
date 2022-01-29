import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevelopersModule } from './modules/developers/developers.module';
import { typeOrmConfig } from './infra/typeorm.config';

@Module({
  imports: [ TypeOrmModule.forRoot(typeOrmConfig), DevelopersModule, ],
})
export class AppModule {}
