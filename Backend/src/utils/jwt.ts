import jwt from 'jsonwebtoken'
import { env } from '../config/env.config';

export function generateAccessToken(userId: string) {
    return jwt.sign({id: userId}, env.JWT_SECRET, {expiresIn: '1h'});
};

export function generateRefreshToken(userId: string) {
    return jwt.sign({id: userId}, env.REFRESH_SECRET, {expiresIn: '7d'})
};

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, env.JWT_SECRET) as {id: string}
    } catch (error) {
        return null
    }
};

export function verifyRefreshToken(token: string) {
    try {
        return jwt.verify(token, env.REFRESH_SECRET) as {id: string}
    } catch (error) {
        return null
    }
};