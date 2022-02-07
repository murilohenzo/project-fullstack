import { Request, Response, Router } from "express";
import { LevelController } from "../controllers/LevelController";

const levelsRouter = Router();

levelsRouter.post("", (request: Request, response: Response) => {
  const levelController = new LevelController();
  return levelController.create(request, response);
});

levelsRouter.get("", (request: Request, response: Response) => {
  const levelController = new LevelController();
  return levelController.findAll(request, response);
});

levelsRouter.get("/:id", (request: Request, response: Response) => {
  const levelController = new LevelController();
  return levelController.findById(request, response);
});

levelsRouter.put("/:id", (request: Request, response: Response) => {
  const levelController = new LevelController();
  return levelController.update(request, response);
});

levelsRouter.delete("/:id", (request: Request, response: Response) => {
  const levelController = new LevelController();
  return levelController.delete(request, response);
});

levelsRouter.post("/search", (request: Request, response: Response) => {
  const levelController = new LevelController();
  return levelController.pagination(request, response);
});

levelsRouter.post("/pagination", (request: Request, response: Response) => {
  const levelController = new LevelController();
  return levelController.pagination(request, response);
});

export { levelsRouter };
