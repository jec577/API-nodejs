import bcrypt from 'bcrypt';
import { CreateUser, loginUser, UpdateUser } from "../dtos/user.dto"
import { UserRepository } from "../repositories/userRepository";
import { BadRequestError } from '../utils/errors';
import Jwt  from 'jsonwebtoken';
import dotEnv from 'dotenv';


dotEnv.config();


const UserService = {
    async create(userData: CreateUser){
        const { email, password } = userData;

        const verifyEmailExists = await UserRepository.findOneBy({email});
        if(verifyEmailExists){
            throw new BadRequestError('Este email já está em uso');
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = UserRepository.create({...userData, password: hashPassword});
        return await UserRepository.save({...newUser});
    },

    async findById(id: string){
        const user = await UserRepository.findOneBy({id});
        if(!user){
            throw new BadRequestError('Usuário não encontrado')
        }
        return user;
    },

    async update(id: string, updateData: UpdateUser){
        const user = await UserRepository.findOneBy({id});
        console.log("Dados",user);
        if(!user){
            throw new BadRequestError('Usuário não encontrado')
        }

        if (updateData.email) {
            const emailExists = await UserRepository.findOneBy({ email: updateData.email });
            if (emailExists && emailExists.id !== id) {
                throw new BadRequestError('O email informado já está em uso por outro usuário.');
            }
        }

        await UserRepository.update(id, updateData);
        return await UserRepository.findOneBy({ id });        
    },

    async login(userData: loginUser){
        const { email, password } = userData;

        const user = await UserRepository.findOneBy({email});
        if(!user){
            throw new BadRequestError('Email ou senha inválidos'); 
        }

        const verifyPassword = await bcrypt.compare(password, String(user.password));
        if(!verifyPassword){
            throw new BadRequestError('Email ou senha inválidos');
        }

        const token = Jwt.sign({id: user.id}, process.env.JWT_KEY ?? '',{
            expiresIn: '24h'
        });
        
        const {password:_, ..._user} = user;
        return {_user, token}

    }


}

export { UserService }