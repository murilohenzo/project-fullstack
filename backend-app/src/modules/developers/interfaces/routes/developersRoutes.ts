import { Request, Response, Router } from "express";
import { DeveloperController } from "../controllers/DeveloperController";

const developersRoutes = Router();

developersRoutes.post("", (request: Request, response: Response) => {
  const developerController = new DeveloperController();
  return developerController.create(request, response);
});

export { developersRoutes };
