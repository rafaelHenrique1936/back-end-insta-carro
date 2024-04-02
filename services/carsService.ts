import carsRepository from "../repository/carsRepository";

class CarService {

    async get(page, perPage) {
        return await carsRepository.find({})
            .skip((page - 1) * perPage)
            .limit(perPage);
    }

    async getById(_id) {
        return await carsRepository.findById(_id);
    }

    async create(car) {
        return await carsRepository.create(car);
    }

    async finishBids(_id) {
        return await carsRepository.findByIdAndUpdate(_id, { auctionEndDate: new Date() });
    }

    async update(_id, car) {
        return await carsRepository.findByIdAndUpdate(_id, car);
    }

    async delete(_id) {
        return await carsRepository.findByIdAndDelete(_id);
    }
}

export default new CarService()