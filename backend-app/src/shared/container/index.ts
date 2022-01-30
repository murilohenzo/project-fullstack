import { container } from "tsyringe";

import { InterfaceDevelopersRepository } from "../../modules/developers/infra/repositories/IDevelopersRepository";
import { DevelopersRepository } from "../../modules/developers/infra/repositories/implements/DevelopersRepository";

container.registerSingleton<InterfaceDevelopersRepository>(
  "DevelopersRepository",
  DevelopersRepository
);
