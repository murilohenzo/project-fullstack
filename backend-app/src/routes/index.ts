import { Router } from "express";
import { developersRoutes } from "../modules/developers/interfaces/routes/developersRoutes";

const routes = Router();
routes.use("/developers", developersRoutes);

export default routes;
