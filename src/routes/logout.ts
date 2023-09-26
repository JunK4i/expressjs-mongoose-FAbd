import { Router } from "express";
import logoutController from "../controllers/logoutController";
const routes = Router();

routes.get("/", logoutController.handleLogout);

export default routes;