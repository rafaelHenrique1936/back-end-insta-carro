import * as HttpStatus from 'http-status';
import Redis from 'ioredis';

import Helper from "../infra/helper";
import usersService from "../services/usersService";

const redis = new Redis();

class UsersController {

    async get(req, res) {

        try {

            const chave = `room:users`;
            let {page, limit} = req.query;
            page = page ? parseInt(page) : 1;
            limit = limit ? parseInt(limit) : 10;

            await redis.get(chave, async function (err, reply) {
                if (reply) {
                    Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
                } else {
                    let result = await usersService.get(page, limit);
                    redis.set(chave, JSON.stringify(result));
                    redis.expire(chave, 20);
                    Helper.sendResponse(res, HttpStatus.OK, result);
                }
            });


        } catch (error) {

            console.error('Erro ao buscar informação:', error.message);

        }

    }

    async getById(req, res) {

        try {

            const _id = req.params.id;

            const chave = `room:${_id}`;

            await redis.get(chave, async function (err, reply) {
                if (reply) {
                    Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
                } else {
                    let result = await usersService.getById(_id);
                    redis.set(chave, JSON.stringify(result));
                    redis.expire(chave, 3600);
                    Helper.sendResponse(res, HttpStatus.OK, result);
                }
            });

        } catch (error) {

            console.error('Erro ao buscar informação:', error.message);

        }
    }

    async create(req, res) {

        try {

            let user = req.body;

            await usersService.create(user);
            Helper.sendResponse(res, HttpStatus.OK, 'Registro incluído com Sucesso!');

        } catch (error) {

            console.error('Erro ao incluir informação:', error.message);

        }
    }

    async update(req, res) {

        try {

            const _id = req.params.id;
            let user = req.body;

            let result = await usersService.update(_id, user);
            Helper.sendResponse(res, HttpStatus.OK, `Registro ${_id} alterado com Sucesso!`);

        } catch (error) {

            console.error('Erro ao atualizar informação:', error.message);

        }

    }

    async delete(req, res) {


        try {
            const _id = req.params.id;

            await usersService.delete(_id);
            Helper.sendResponse(res, HttpStatus.OK, `Registro ${_id} deletado com Sucesso!`);

        } catch (error) {

            console.error('Erro ao deletar informação:', error.message);

        }

    }
}

export default new UsersController();