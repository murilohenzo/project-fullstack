import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions =
  {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'adm',
    password: '12345',
    database: 'project',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    logging: true,
    logger: "advanced-console",
  }
