import { Router } from "express";
import registerController from "../controllers/registerController";

const routes = Router();

routes.post("/", registerController.handleNewUser);

export default routes;