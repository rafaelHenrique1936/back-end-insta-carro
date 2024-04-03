import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Configs from './configs';

class Auth {
    public validate(req: Request, res: Response, next: NextFunction): void {
        const token = req.headers['x-access-token'] as string;

        if (!token) {
            res.status(401).send({
                success: false,
                message: '401 - Unauthorized'
            });
        } else {
            jwt.verify(token, Configs.secret, (err, decoded) => {
                if (err) {
                    res.status(403).send({
                        success: false,
                        message: '403 - Token Inválido'
                    });
                } else {
                    next();
                }
            });
        }
    }
}

export default new Auth();