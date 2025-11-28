import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined;

    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    try {
        const payload = jwt.verify(token, secretKey) as any;
        // attach user payload (id, email) to request
        (req as any).user = payload;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};