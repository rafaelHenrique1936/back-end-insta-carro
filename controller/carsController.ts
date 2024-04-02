import * as HttpStatus from 'http-status';
import Redis from 'ioredis';

import Helper from "../infra/helper";
import carsService from "../services/carsService";
import bidsService from '../services/bidsService';

const redis = new Redis();

class CarsController {

    async get(req, res) {

        try {

            const chave = `room:cars`;
            let {page, limit} = req.query;
            page = page ? parseInt(page) : 1;
            limit = limit ? parseInt(limit) : 10;

            await redis.get(chave, async function (err, reply) {
                if (reply) {
                    Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
                } else {
                    let result = await carsService.get(page, limit);
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
                    let result = await carsService.getById(_id);
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

            let car = req.body;

            await carsService.create(car);
            Helper.sendResponse(res, HttpStatus.OK, 'Registro incluído com Sucesso!');

        } catch (error) {

            console.error('Erro ao incluir informação:', error.message);

        }
    }

    async update(req, res) {

        try {

            const _id = req.params.id;
            let car = req.body;

            let result = await carsService.update(_id, car);
            Helper.sendResponse(res, HttpStatus.OK, `Registro ${_id} alterado com Sucesso!`);

        } catch (error) {

            console.error('Erro ao atualizar informação:', error.message);

        }

    }

    async finishBids(req, res) {

        try {

            const _id = req.params.id;

            let finishBids = await carsService.finishBids(_id);

            let result = await bidsService.getLastId(_id);

            Helper.sendResponse(res, HttpStatus.OK, result);

        } catch (error) {

            console.error('Erro ao atualizar informação:', error.message);

        }

    }

    async delete(req, res) {


        try {
            const _id = req.params.id;

            await carsService.delete(_id);
            Helper.sendResponse(res, HttpStatus.OK, `Registro ${_id} deletado com Sucesso!`);

        } catch (error) {

            console.error('Erro ao deletar informação:', error.message);

        }

    }
}

export default new CarsController();