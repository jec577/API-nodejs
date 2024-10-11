import { Request, Response, NextFunction } from "express";
import dotenv  from "dotenv";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository";

dotenv.config();

type JwtPayLoad = {
    id: string;
}

const authMiddleware = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const { authorization } = req.headers;

        if(!authorization){
            return res.status(401).json({message:'Usuário não autorizado'});
        }

        const token = authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.JWT_KEY ?? '') as JwtPayLoad;
        const user = await UserRepository.findOneBy({id: String(id)});

        if(!user){
            return res.status(401).json({message:'Usuário não autorizado'});
        }

        req.user = user;
        next();

    } catch (error){
        if(error instanceof TokenExpiredError){
            return res.status(401).json({message:'Token expirado, faça login novamente'}); 
        } else{
            return res.status(401).json({message:'Token Inválido'});
        }
    }
}

export { authMiddleware }