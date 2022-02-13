import { Router } from "express";
import webRouter from "./web";

const routes = Router();

routes.use("/web", webRouter);

export default routes;
