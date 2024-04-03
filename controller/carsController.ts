import * as HttpStatus from 'http-status';
import Redis from 'ioredis';
import Helper from "../infra/helper";
import CarsService from "../services/carsService";
import BidsService from '../services/bidsService';

const redis = new Redis();

class CarsController {
   

    async get(req: any, res: any): Promise<void> {
        try {
            const { page = 1, limit = 10 } = req.query;
            const chave = `room:cars`;

            const cachedCars = await redis.get(chave);
            if (cachedCars) {
                Helper.sendResponse(res, HttpStatus.OK, JSON.parse(cachedCars));
            } else {
                const result = await CarsService.get(page, limit);
                redis.set(chave, JSON.stringify(result));
                redis.expire(chave, 3600);
                Helper.sendResponse(res, HttpStatus.OK, result);
            }
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getById(req: any, res: any): Promise<void> {
        try {
            const _id = req.params.id;
            const chave = `room:${_id}`;

            const cachedCar = await redis.get(chave);
            if (cachedCar) {
                Helper.sendResponse(res, HttpStatus.OK, JSON.parse(cachedCar));
            } else {
                const result = await CarsService.getById(_id);
                redis.set(chave, JSON.stringify(result));
                redis.expire(chave, 3600);
                Helper.sendResponse(res, HttpStatus.OK, result);
            }
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async create(req: any, res: any): Promise<void> {
        try {
            const car = req.body;
            await CarsService.create(car);
            Helper.sendResponse(res, HttpStatus.OK, 'Registro incluído com Sucesso!');
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async update(req: any, res: any): Promise<void> {
        try {
            const _id = req.params.id;
            const car = req.body;
            await CarsService.update(_id, car);
            Helper.sendResponse(res, HttpStatus.OK, `Registro ${_id} alterado com Sucesso!`);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async finishBids(req: any, res: any): Promise<void> {
        try {
            const _id = req.params.id;
            await CarsService.finishBids(_id);
            const result = await BidsService.getLastBidByCar(_id);
            Helper.sendResponse(res, HttpStatus.OK, result);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async delete(req: any, res: any): Promise<void> {
        try {
            const _id = req.params.id;
            await CarsService.delete(_id);
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

export default new CarsController();