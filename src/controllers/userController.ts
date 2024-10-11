import { Request, Response } from 'express';
import { createUserDTO, loginUserDTO, updateUserDTO } from '../dtos/user.dto';
import { UserService } from '../services/userService';
import { ZodError } from 'zod';
import { BadRequestError } from '../utils/errors';
import { handleErrors } from '../utils/handleErrors';

const UserController = {
    async create(req: Request, res: Response) {
        try {
            const userData = createUserDTO.parse(req.body);
            const user = await UserService.create(userData);
            return res.status(201).json({ user });
        } catch (error: any) {
           handleErrors(res, error);
        }
    },

    async login(req: Request, res: Response) {
        try {
            const userData = loginUserDTO.parse(req.body);
            const user = await UserService.login(userData);

            return res.status(200).json({ user });

        } catch (error: any) {
            handleErrors(res, error);
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.user;
            const updateData = updateUserDTO.parse(req.body);

            const update = await UserService.update(String(id), updateData);
            return res.status(200).json({ user: update });

        } catch (error: any) {
            handleErrors(res, error);
        }
    },

    async getProfile(req: Request, res: Response) {
        try {
            const { id } = req.user;

            const user = await UserService.findById(String(id));
            return res.status(200).json(user);

        } catch (error) {
            handleErrors(res, error);
        }
    }
};


export { UserController }