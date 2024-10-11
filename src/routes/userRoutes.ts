import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRoutes = Router();

//Rotas Públicas
userRoutes.post('/', UserController.create);
userRoutes.post('/login', UserController.login);

//Rotas Privadas
userRoutes.use(authMiddleware);
userRoutes.patch('/', UserController.update);
userRoutes.get('/profile', authMiddleware, UserController.getProfile);

export {userRoutes}