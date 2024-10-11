import { Response } from 'express';
import { ZodError } from 'zod';
import { BadRequestError } from './errors';

const handleErrors = (res: Response, error: any) => {
    if (error instanceof ZodError) {
        return res.status(400).json({
            errors: error.errors.map(err => ({
                path: err.path,
                message: err.message,
            })),
        });
    }

    if (error instanceof BadRequestError) {
        return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro no servidor', error });
};

export { handleErrors };
