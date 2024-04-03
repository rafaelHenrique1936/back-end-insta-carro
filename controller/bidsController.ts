import * as HttpStatus from 'http-status';
import Redis from 'ioredis';
import Helper from "../infra/helper";
import BidsService from "../services/bidsService";

const redis = new Redis();

class BidsController {
   
    async getById(req: any, res: any): Promise<void> {
        try {
            const _id = req.params.id;
            const chave = `room:${_id}`;

            const cachedBid = await redis.get(chave);
            if (cachedBid) {
                Helper.sendResponse(res, HttpStatus.OK, JSON.parse(cachedBid));
            } else {
                const result = await BidsService.getById(_id);
                redis.set(chave, JSON.stringify(result));
                redis.expire(chave, 3600);
                Helper.sendResponse(res, HttpStatus.OK, result);
            }
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getByCar(req: any, res: any): Promise<void> {
        try {
            const _id = req.params.id;
            const result = await BidsService.getByCar(_id);
            Helper.sendResponse(res, HttpStatus.OK, result);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getByUser(req: any, res: any): Promise<void> {
        try {
            const _id = req.params.id;
            const result = await BidsService.getByUser(_id);
            Helper.sendResponse(res, HttpStatus.OK, result);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getLastId(req: any, res: any): Promise<void> {
        try {
            const _id = req.params.id;
            const result = await BidsService.getLastBidByCar(_id);
            Helper.sendResponse(res, HttpStatus.OK, result);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async create(req: any, res: any): Promise<void> {
        try {
            const bids = req.body;
            const result = await BidsService.create(bids);
            const message = result[0]?.message || 'Registro incluído com Sucesso!';
            Helper.sendResponse(res, HttpStatus.OK, message);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async update(req: any, res: any): Promise<void> {
        try {
            const _id = req.params.id;
            const bids = req.body;
            const result = await BidsService.update(_id, bids);
            Helper.sendResponse(res, HttpStatus.OK, `Registro ${_id} alterado com Sucesso!`);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async delete(req: any, res: any): Promise<void> {
        try {
            const _id = req.params.id;
            await BidsService.delete(_id);
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

export default new BidsController();