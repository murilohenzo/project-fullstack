import { container } from "tsyringe";

import { InterfaceDevelopersRepository } from "../../modules/developers/infra/repositories/IDevelopersRepository";
import { DevelopersRepository } from "../../modules/developers/infra/repositories/implements/DevelopersRepository";
import { InterfaceLevelsRepository } from "../../modules/levels/infra/repositories/ILevelsRepository";
import { LevelsRepository } from "../../modules/levels/infra/repositories/implements/LevelsRepository";

container.registerSingleton<InterfaceDevelopersRepository>(
  "DevelopersRepository",
  DevelopersRepository
);

container.registerSingleton<InterfaceLevelsRepository>(
  "LevelsRepository",
  LevelsRepository
);
