import usersRepository from "../repository/usersRepository";

class userService {

    async get(page, perPage) {
        return await usersRepository.find({})
            .skip((page - 1) * perPage)
            .limit(perPage);
    }

    async getById(_id) {
        return await usersRepository.findById(_id);
    }

    async create(car) {
        return await usersRepository.create(car);
    }

    async update(_id, car) {
        return await usersRepository.findByIdAndUpdate(_id, car);
    }

    async delete(_id) {
        return await usersRepository.findByIdAndDelete(_id);
    }
}

export default new userService()