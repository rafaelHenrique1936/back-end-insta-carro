import carsRepository from "../repository/carsRepository";
import { Car } from "../models/carsSchema";

class CarService {

    async get(page: number, perPage: number): Promise<Car[]> {
        const cars = await carsRepository.find({});
        const start = (page - 1) * perPage;
        const end = start + perPage;

        return cars.slice(start, end);
    }

    async getById(_id: string): Promise<Car | null> {
        return await carsRepository.findById(_id);
    }

    async create(car: Car): Promise<Car> {
        return await carsRepository.create(car);
    }

    async finishBids(_id: string): Promise<Car | null> {
        return await carsRepository.findByIdAndUpdate(_id, { auctionEndDate: new Date() });
    }

    async update(_id: string, car: Partial<Car>): Promise<Car | null> {
        return await carsRepository.findByIdAndUpdate(_id, car);
    }

    async delete(_id: string): Promise<Car | null> {
        return await carsRepository.findByIdAndDelete(_id);
    }
}

export default new CarService();
