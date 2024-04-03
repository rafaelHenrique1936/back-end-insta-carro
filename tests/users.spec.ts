import { User } from '../models/usersSchema';
import usersRepository from '../repository/usersRepository';
import userService from '../services/usersService';
import { expect, jest, describe, it } from '@jest/globals';
import UserModel from '../repository/usersRepository';


jest.mock('../repository/usersRepository');

const generateMockUsers = (count: number): User[] => {
    const mockUsers: User[] = [];
    for (let i = 0; i < count; i++) {
        const newuser = new UserModel({
            name: 'Rafael' + i,
            email: 'rafaele' + i + '@gmail.com',
            password: 'password',
            phoneNumber: '3499999994',
            active: true
        });
        mockUsers.push(newuser);
    }
    return mockUsers;
};

describe('userService', () => {
    describe('get', () => {
        it('should return a paginated list of users', async () => {
            const page = 1;
            const perPage = 10;

            const mockUsers: User[] = generateMockUsers(10);
            (usersRepository.find as jest.Mock).mockReturnValue(mockUsers);

            const result = await userService.get(page, perPage);
            expect(result).toEqual(mockUsers);
        });

        it('should throw an error when failing to fetch a paginated list of users', async () => {
            const page = 1;
            const perPage = 10;

            (usersRepository.find as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao consultar usuários');
            });

            await expect(userService.get(page, perPage)).rejects.toThrow('Erro ao consultar usuários');
        });
    });

    describe('getById', () => {
        it('should return a user by ID', async () => {
            const userId = '123456';

            const mockUsers: User[] = generateMockUsers(1);
            (usersRepository.findById as jest.Mock).mockReturnValue(mockUsers);

            const result = await userService.getById(userId);

            expect(result).toEqual(mockUsers);
        });

        it('should throw an error when failing to fetch a user by ID', async () => {
            const userId = '123456';

            (usersRepository.findById as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao buscar usuário pelo ID');
            });

            await expect(userService.getById(userId)).rejects.toThrow('Erro ao buscar usuário pelo ID');
        });
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const mockUsers: User[] = generateMockUsers(1);
            (usersRepository.create as jest.Mock).mockReturnValue(mockUsers[0]);

            const result = await userService.create(mockUsers[0]);

            expect(result).toEqual(mockUsers[0]);
        });

        it('should throw an error when failing to create a new user', async () => {
            const mockUser = generateMockUsers(1)[0];

            (usersRepository.create as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao criar novo usuário');
            });

            await expect(userService.create(mockUser)).rejects.toThrow('Erro ao criar novo usuário');
        });
    });

    describe('update', () => {
        it('should update an existing user', async () => {
            const userId = '123456';
            const mockUsers: User[] = generateMockUsers(1);

            (usersRepository.findByIdAndUpdate as jest.Mock).mockReturnValue(mockUsers[0]);

            const result = await userService.update(userId, mockUsers[0]);
            expect(result).toEqual(mockUsers[0]);
        });

        it('should throw an error when failing to update an existing user', async () => {
            const userId = '123456';
            const mockUser = generateMockUsers(1)[0];

            (usersRepository.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao atualizar usuário');
            });

            await expect(userService.update(userId, mockUser)).rejects.toThrow('Erro ao atualizar usuário');
        });
    });

    describe('delete', () => {
        it('should delete a user by ID', async () => {
            const userId = '123456';

            (usersRepository.findByIdAndDelete as jest.Mock).mockReturnValue(userId);

            const result = await userService.delete(userId);
            expect(result).toEqual(userId);
        });

        it('should throw an error when failing to delete a user by ID', async () => {
            const userId = '123456';

            (usersRepository.findByIdAndDelete as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao excluir usuário');
            });

            await expect(userService.delete(userId)).rejects.toThrow('Erro ao excluir usuário');
        });
    });
});
