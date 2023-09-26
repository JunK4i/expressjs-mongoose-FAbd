import { Router } from "express";
import authController from "../controllers/authController";

const routes = Router();

routes.post("/", authController.handleLogin);

export default routes;