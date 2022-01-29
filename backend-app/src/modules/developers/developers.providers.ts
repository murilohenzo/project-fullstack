import { Connection } from 'typeorm';
import { Developers } from './domain/developers.entity';
import { DevelopersRepository } from './infra/repositories/developers.repository';

export const developersProviders = [
  {
    provide: 'DevelopersRepository',
    useClass: DevelopersRepository,
    useFactory: (connection: Connection) => connection.getRepository(Developers),
    inject: ['DATABASE_CONNECTION'],
  },
];

