import * as HttpStatus from 'http-status';
import Redis from 'ioredis';
import Helper from "../infra/helper";
import UsersService from "../services/usersService";

const redis = new Redis();

class UsersController {
   
    async get(req: any, res: any): Promise<void> {
        try {
            const chave = `room:users`;
            let { page, limit } = req.query;
            page = page ? parseInt(page) : 1;
            limit = limit ? parseInt(limit) : 10;

            await redis.get(chave, async function (err: any, reply: any) {
                if (reply) {
                    Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
                } else {
                    const result = await UsersService.get(page, limit);
                    redis.set(chave, JSON.stringify(result));
                    redis.expire(chave, 10);
                    Helper.sendResponse(res, HttpStatus.OK, result);
                }
            });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getById(req: any, res: any): Promise<void> {
        try {
            const _id = req.params.id;
            const chave = `room:${_id}`;

            await redis.get(chave, async function (err: any, reply: any) {
                if (reply) {
                    Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
                } else {
                    const result = await UsersService.getById(_id);
                    redis.set(chave, JSON.stringify(result));
                    redis.expire(chave, 10);
                    Helper.sendResponse(res, HttpStatus.OK, result);
                }
            });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async create(req: any, res: any): Promise<void> {
        try {
            const user = req.body;
            const result = await UsersService.create(user);
            Helper.sendResponse(res, HttpStatus.OK, 'Registro incluído com Sucesso!');
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async update(req: any, res: any): Promise<void> {
        try {
            const _id = req.params.id;
            const user = req.body;
            const result = await UsersService.update(_id, user);
            Helper.sendResponse(res, HttpStatus.OK, `Registro ${_id} alterado com Sucesso!`);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async delete(req: any, res: any): Promise<void> {
        try {
            const _id = req.params.id;
            await UsersService.delete(_id);
            Helper.sendResponse(res, HttpStatus.OK, `Registro ${_id} deletado com Sucesso!`);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    private handleError(res: any, error: Error): void {
        console.error('Erro:', error.message);
        Helper.sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno no servidor');
    }
}

export default new UsersController();