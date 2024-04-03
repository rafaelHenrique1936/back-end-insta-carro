
import usersRepository from "../repository/usersRepository";

class userService {

    async get(page, perPage) {
         
        const users = await usersRepository.find({})
        const start = (page - 1) * perPage;
        const end = start + perPage;

        return users.slice(start, end);
    }

    async getById(_id) {
        return await usersRepository.findById(_id);
    }

    async create(user) {

        return await usersRepository.create(user);

    }

    async update(_id, user) {
        return await usersRepository.findByIdAndUpdate(_id, user);
    }

    async delete(_id) {
        return await usersRepository.findByIdAndDelete(_id);
    }
}

export default new userService()