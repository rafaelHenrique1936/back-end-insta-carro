import bidsRepository from "../repository/bidsRepository";
import carsRepository from "../repository/carsRepository";
import { Bid } from "../models/bidsSchema";

class BidsService {

    async getByCar(carId: string): Promise<Bid[]> {
        return await bidsRepository.find({ 'car': carId }).populate('user').populate('car').exec();
    }

    async getByUser(userId: string): Promise<Bid[]> {
        return await bidsRepository.find({ 'user': userId }).populate('user').populate('car').exec();
    }

    async getLastBidByCar(carId: string): Promise<Bid | null> {
        return await bidsRepository.findOne({ 'car': carId }).sort({ timestamp: -1 }).limit(1).populate('user').populate('car').exec();
    }

    async getById(bidId: string): Promise<Bid | null> {
        return await bidsRepository.findById(bidId).populate('user').populate('car').exec();
    }

    async create(bidData: Bid): Promise<Bid | { message: string }[]> {
        const { car } = bidData;

        const existingCar = await carsRepository.findById(car);
        if (!existingCar) {
            return [{ message: 'Carro não encontrado.' }];
        }

        const carWithAuctionEndDate = await carsRepository.findOne({ '_id': car, auctionEndDate: { $exists: true } });
        if (carWithAuctionEndDate) {
            return [{ message: 'Não é possível adicionar o lance porque o leilão deste carro já se encontra finalizado.' }];
        }

        return await bidsRepository.create(bidData);
    }

    async update(bidId: string, updatedBidData: Partial<Bid>): Promise<Bid | null> {
        return await bidsRepository.findByIdAndUpdate(bidId, updatedBidData);
    }

    async delete(bidId: string): Promise<Bid | null> {
        return await bidsRepository.findByIdAndDelete(bidId);
    }
}

export default new BidsService();
