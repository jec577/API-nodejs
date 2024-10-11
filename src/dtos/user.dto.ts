import { z } from 'zod';

export const createUserDTO = z.object({
    username: z.string().min(1, { message: 'O nome é obrigatório' }),
    email: z.string().email('Formato de email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    occupation: z.string().min(1, { message: 'A ocupação é obrigatória' }),
});

export const loginUserDTO = z.object({
    email: z.string().email("Formato de email inválido"),
    password: z.string().min(1, "Forneça a sua senha"),
});

export const updateUserDTO = z.object({
    username: z.string().optional(),
    email: z.string().email('Formato de email inválido').optional(),
    occupation: z.string().optional(),
}).refine((data) => {
   return data.username || data.email || data.occupation
}, {
    message: 'Nenhuma alteração foi feita nos atributos',
    path: ['global']
})


export type CreateUser = z.infer<typeof createUserDTO>;
export type UpdateUser = z.infer<typeof updateUserDTO>;
export type loginUser = z.infer<typeof loginUserDTO>;