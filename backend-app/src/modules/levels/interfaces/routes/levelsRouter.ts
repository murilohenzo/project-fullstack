import { Request, Response, Router } from "express";
import { LevelController } from "../controllers/LevelController";

const levelsRouter = Router();

levelsRouter.post("", (request: Request, response: Response) => {
  const developerController = new LevelController();
  return developerController.create(request, response);
});

levelsRouter.get("", (request: Request, response: Response) => {
  const developerController = new LevelController();
  return developerController.findAll(request, response);
});

levelsRouter.get("/:id", (request: Request, response: Response) => {
  const developerController = new LevelController();
  return developerController.findById(request, response);
});

levelsRouter.put("/:id", (request: Request, response: Response) => {
  const developerController = new LevelController();
  return developerController.update(request, response);
});

export { levelsRouter };
