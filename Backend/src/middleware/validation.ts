import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../constants/statusConstant';

const registerSchema = z.object({
    name: z.string()
        .min(2, { message: 'Name must be at least 2 characters long' })
        .max(50, { message: 'Name cannot exceed 50 characters' }),
    email: z.string()
        .email({ message: 'Invalid email address' }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

type RegisterInput = z.infer<typeof registerSchema>;

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
    try {
        registerSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Validation failed',
                errors: error.errors,
            });
        } else {
            next(error);
        }
    }
};