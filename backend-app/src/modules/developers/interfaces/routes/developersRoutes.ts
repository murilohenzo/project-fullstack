import { Request, Response, Router } from "express";
import { DeveloperController } from "../controllers/DeveloperController";

const developersRoutes = Router();

developersRoutes.post("", (request: Request, response: Response) => {
  const developerController = new DeveloperController();
  return developerController.create(request, response);
});

developersRoutes.get("", (request: Request, response: Response) => {
  const developerController = new DeveloperController();
  return developerController.findAll(request, response);
});

developersRoutes.put("/:id", (request: Request, response: Response) => {
  const developerController = new DeveloperController();
  return developerController.update(request, response);
});

export { developersRoutes };
