import { Router } from "express";
import { UserController } from "../controllers/userController";
import { userRoutes } from "./userRoutes";

const routes = Router();
routes.use('/user', userRoutes);


export {routes}

