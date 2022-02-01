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

developersRoutes.get("/:id", (request: Request, response: Response) => {
  const developerController = new DeveloperController();
  return developerController.findById(request, response);
});

developersRoutes.put("/:id", (request: Request, response: Response) => {
  const developerController = new DeveloperController();
  return developerController.update(request, response);
});

developersRoutes.delete("/:id", (request: Request, response: Response) => {
  const developerController = new DeveloperController();
  return developerController.delete(request, response);
});

developersRoutes.post("/search", (request: Request, response: Response) => {
  const developerController = new DeveloperController();
  return developerController.search(request, response);
});

developersRoutes.post("/pagination", (request: Request, response: Response) => {
  const developerController = new DeveloperController();
  return developerController.pagination(request, response);
});

export { developersRoutes };
