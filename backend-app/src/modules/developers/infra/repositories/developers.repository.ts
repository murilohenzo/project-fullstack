import { EntityRepository, Repository } from 'typeorm';
import { Developers } from '../../domain/developers.entity';
import { ICreateDeveloperDTO } from '../../dtos/create.developer.dto';

@EntityRepository(Developers)
export class DevelopersRepository extends Repository<Developers> {

  async createDeveloper({
    level,
    name,
    sex,
    birthDate,
    age,
    hobby
  }: ICreateDeveloperDTO): Promise<Developers> {

    const developer = this.create({
      level, name, sex, birthDate, age, hobby
    });

    await this.save(developer);

    return developer;
  }
}