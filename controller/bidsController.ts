import * as HttpStatus from 'http-status';
import Redis from 'ioredis';

import Helper from "../infra/helper";
import bidsService from "../services/bidsService";

const redis = new Redis();

class BidsController {


    async getById(req, res) {

        try {

            const _id = req.params.id;

            const chave = `room:${_id}`;

            await redis.get(chave, async function (err, reply) {
                if (reply) {
                    Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
                } else {
                    let result = await bidsService.getById(_id);
                    redis.set(chave, JSON.stringify(result));
                    redis.expire(chave, 20);
                    Helper.sendResponse(res, HttpStatus.OK, result);
                }
            });

        } catch (error) {

            console.error('Erro ao buscar informação:', error.message);

        }
    }

    async getByCar(req, res) {

        try {

            const _id = req.params.id;

            let result = await bidsService.getByCar(_id);

            Helper.sendResponse(res, HttpStatus.OK, result);


        } catch (error) {

            console.error('Erro ao buscar informação:', error.message);

        }
    }

    async getByUser(req, res) {

        try {

            const _id = req.params.id;

            let result = await bidsService.getByUser(_id);

            Helper.sendResponse(res, HttpStatus.OK, result);


        } catch (error) {

            console.error('Erro ao buscar informação:', error.message);

        }
    }

    async getLastId(req, res) {

        try {

            const _id = req.params.id;

            let result = await bidsService.getLastId(_id);

            Helper.sendResponse(res, HttpStatus.OK, result);


        } catch (error) {

            console.error('Erro ao buscar informação:', error.message);

        }
    }

    async create(req, res) {

        try {

            let bids = req.body;
            let message : String; 

            let result = await bidsService.create(bids);
            message = result[0]?.message ? result[0]?.message : 'Registro incluído com Sucesso!';
            Helper.sendResponse(res, HttpStatus.OK, message);

        } catch (error) {

            console.error('Erro ao incluir informação:', error.message);

        }
    }

    async update(req, res) {

        try {

            const _id = req.params.id;
            let bids = req.body;

            let result = await bidsService.update(_id, bids);
            Helper.sendResponse(res, HttpStatus.OK, `Registro ${_id} alterado com Sucesso!`);

        } catch (error) {

            console.error('Erro ao atualizar informação:', error.message);

        }

    }

    async delete(req, res) {


        try {
            const _id = req.params.id;

            await bidsService.delete(_id);
            Helper.sendResponse(res, HttpStatus.OK, `Registro ${_id} deletado com Sucesso!`);

        } catch (error) {

            console.error('Erro ao deletar informação:', error.message);

        }

    }
}

export default new BidsController();