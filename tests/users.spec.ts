import userService from '../services/usersService';
import usersRepository from '../repository/usersRepository';
import { expect, jest, describe, it, } from '@jest/globals';

interface IUser {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    active: boolean;
}

jest.mock('../repository/usersRepository');
const generateMockUsers = (count: number): IUser[] => {
    const mockUsers: IUser[] = [];
    for (let i = 0; i < count; i++) {
        mockUsers.push({
            name: 'Rafael' + i,
            email: 'rafaele' + i + '@gmail.com',
            password: 'password',
            phoneNumber: '3499999994',
            active: true
        });
    }
    return mockUsers;
};

describe('userService', () => {
    describe('get', () => {
        it('deve retornar uma lista de usuários paginada', async () => {
            const page = 1;
            const perPage = 10;

            const mockUsers: IUser[] = generateMockUsers(10);
            (usersRepository.find as jest.Mock).mockReturnValue(mockUsers);
            const result = await userService.get(page, perPage);
            expect(result).toEqual(mockUsers);
        });
    });

    describe('get', () => {
        it('deve retornar erro em caso de falha na busca da lista de usuários paginada', async () => {
            const page = 1;
            const perPage = 10;

            (usersRepository.find as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao consultar usuários');
            });

            await expect(userService.get(page, perPage)).rejects.toThrow('Erro ao consultar usuários');
        });
    });


    describe('getById', () => {
        it('deve retornar um usuário pelo ID', async () => {

            const userId = '123456';

            const mockUsers: IUser[] = generateMockUsers(1);
            (usersRepository.findById as jest.Mock).mockReturnValue(mockUsers);

            const result = await userService.getById(userId);

            expect(result).toEqual(mockUsers);
        });
    });

    describe('getById', () => {
        it('deve retornar error ao não conseguir buscar um usuário pelo ID', async () => {
            const userId = '123456';

            (usersRepository.findById as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao buscar usuário pelo ID');
            });

            await expect(userService.getById(userId)).rejects.toThrow('Erro ao buscar usuário pelo ID');
        });
    });

    describe('create', () => {
        it('deve criar um novo usuário', async () => {
            const mockUsers: IUser[] = generateMockUsers(1);
            (usersRepository.create as jest.Mock).mockReturnValue(mockUsers[0]);

            const result = await userService.create(mockUsers[0]);

            expect(result).toEqual(mockUsers[0]);
        });
    });

    describe('create', () => {
        it('deve retornar error ao não coseguir criar um novo usuário', async () => {

            const mockUser = generateMockUsers(1);

            (usersRepository.create as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao criar novo usuário');
            });

            await expect(userService.create(mockUser)).rejects.toThrow('Erro ao criar novo usuário');
        });
    });

    describe('update', () => {
        it('deve atualizar um usuário existente', async () => {
            const userId = '123456';
            const mockUsers: IUser[] = generateMockUsers(1);

            (usersRepository.findByIdAndUpdate as jest.Mock).mockReturnValue(mockUsers[0]);

            const result = await userService.update(userId, mockUsers[0]);
            expect(result).toEqual(mockUsers[0]);
        });
    });

    describe('update', () => {
        it('deve retornar erro ao não conseguir atualizar um usuário existente', async () => {
            const userId = '123456';
            const mockUser = generateMockUsers(1);

            (usersRepository.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao atualizar usuário');
            });

            await expect(userService.update(userId, mockUser)).rejects.toThrow('Erro ao atualizar usuário');
        });
    });


    describe('delete', () => {
        it('deve excluir um usuário pelo ID', async () => {
            const userId = '123456';

            (usersRepository.findByIdAndDelete as jest.Mock).mockReturnValue(userId);

            const result = await userService.delete(userId);
            expect(result).toEqual(userId);
        });
    });

    describe('delete', () => {
        it('deve retornar erro ao não conseguir excluir um usuário pelo ID', async () => {
            const userId = '123456';
    
            (usersRepository.findByIdAndDelete as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao excluir usuário');
            });
    
            await expect(userService.delete(userId)).rejects.toThrow('Erro ao excluir usuário');
        });
    });
    
});