import { Router } from 'express';
import userController from '../../controllers/userController';

const routes = Router();

routes.get('/', userController.getUserProfile);
routes.post('/', userController.updateUserProfileSettings);
routes.delete('/', userController.deleteUser);

export default routes;