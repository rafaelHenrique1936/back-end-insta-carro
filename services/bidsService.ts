import bidsRepository from "../repository/bidsRepository";
import carsRepository from "../repository/carsRepository";


class bidsService {

    async getByCar(_id) {
        return await bidsRepository.find({ 'car': _id }).populate('user').populate('car').exec();

    }

    async getByUser(_id) {
        return await bidsRepository.find({ 'user': _id }).populate('user').populate('car').exec();
    }

    async getLastId(_id) {
        return await bidsRepository.find({ 'car': _id }).sort({ timestamp: -1 }).limit(1).populate('user').populate('car').exec();
    }

    async getById(_id) {
        return await bidsRepository.findById(_id).populate('user').populate('car').exec();
    }

    async create(bids) {

        const carWithAuctionEndDate = await carsRepository.find({ '_id': bids.car, auctionEndDate: { $exists: true } });

        if (carWithAuctionEndDate.length > 0) {

            return [{ message :  'Não é possível adicionar o lance porque o leilão deste carro já se encontra finalizado.' }];

        } else {

            return await bidsRepository.create(bids);

        }

    }

    async update(_id, bids) {
        return await bidsRepository.findByIdAndUpdate(_id, bids);
    }

    async delete(_id) {
        return await bidsRepository.findByIdAndDelete(_id);
    }
}

export default new bidsService()