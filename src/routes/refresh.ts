import { Router } from "express";
import refreshTokenController from "../controllers/refreshTokenController";

const routes = Router();

routes.get("/", refreshTokenController.handleRefreshToken);

export default routes;