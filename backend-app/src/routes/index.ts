import { Router } from "express";
import { developersRoutes } from "../modules/developers/interfaces/routes/developersRoutes";
import { levelsRouter } from "../modules/levels/interfaces/routes/levelsRouter";

const routes = Router();
routes.use("/developers", developersRoutes);
routes.use("/levels", levelsRouter);

export default routes;
