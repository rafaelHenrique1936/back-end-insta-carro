import usersRepository from "../repository/usersRepository";
import { User } from "../models/usersSchema";

class UserService {

    async get(page: number, perPage: number): Promise<User[]> {
        const users = await usersRepository.find({});
        const start = (page - 1) * perPage;
        const end = start + perPage;

        return users.slice(start, end);
    }

    async getById(_id: string): Promise<User | null> {
        return await usersRepository.findById(_id);
    }

    async create(user: User): Promise<User> {
        return await usersRepository.create(user);
    }

    async update(_id: string, user: Partial<User>): Promise<User | null> {
        return await usersRepository.findByIdAndUpdate(_id, user);
    }

    async delete(_id: string): Promise<User | null> {
        return await usersRepository.findByIdAndDelete(_id);
    }
}

export default new UserService();
