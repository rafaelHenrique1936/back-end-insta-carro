import carService from '../services/carsService';
import carsRepository from '../repository/carsRepository';
import { expect, jest, describe, it, } from '@jest/globals';

interface ICar {
    brand: String,
    models: String,
    year: Number,
    mileage: Number,
    price: Number,
    minimumPrice: Number,
    transmission: String,
    fuelType: String,
    engineSize: Number,
    numOfSeats: Number,
    numOfDoors: Number,
    color: String,
    condition: String,
    features: String,
}

jest.mock('../repository/carsRepository');
const generateMockCars = (count: number): ICar[] => {
    const mockCars: ICar[] = [];
    for (let i = 0; i < count; i++) {
        mockCars.push({
            brand: "Toyota",
            models: "Corolla Cross",
            year: 2021,
            mileage: 50000,
            price: 35000,
            minimumPrice: 30000,
            transmission: "Automatico",
            fuelType: "Gasolina",
            engineSize: 2.0,
            numOfSeats: 5,
            numOfDoors: 4,
            color: "Preto",
            condition: "Usado",
            features: "GPS, Bancos em Couro"
        });
    }
    return mockCars;
};

describe('carService', () => {
    describe('get', () => {
        it('deve retornar uma lista de carros paginada', async () => {
            const page = 1;
            const perPage = 10;

            const mockCars: ICar[] = generateMockCars(10);
            (carsRepository.find as jest.Mock).mockReturnValue(mockCars);
            const result = await carService.get(page, perPage);
            expect(result).toEqual(mockCars);
        });
    });

    describe('get', () => {
        it('deve retornar erro em caso de falha na busca da lista de carros paginada', async () => {
            const page = 1;
            const perPage = 10;

            (carsRepository.find as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao consultar carros');
            });

            await expect(carService.get(page, perPage)).rejects.toThrow('Erro ao consultar carros');
        });
    });


    describe('getById', () => {
        it('deve retornar um carros pelo ID', async () => {

            const carId = '123456';

            const mockCars: ICar[] = generateMockCars(1);
            (carsRepository.findById as jest.Mock).mockReturnValue(mockCars);

            const result = await carService.getById(carId);

            expect(result).toEqual(mockCars);
        });
    });

    describe('getById', () => {
        it('deve retornar error ao não conseguir buscar um carros pelo ID', async () => {
            const carId = '123456';

            (carsRepository.findById as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao buscar carros pelo ID');
            });

            await expect(carService.getById(carId)).rejects.toThrow('Erro ao buscar carros pelo ID');
        });
    });

    describe('create', () => {
        it('deve criar um novo carros', async () => {
            const mockCars: ICar[] = generateMockCars(1);
            (carsRepository.create as jest.Mock).mockReturnValue(mockCars[0]);

            const result = await carService.create(mockCars[0]);

            expect(result).toEqual(mockCars[0]);
        });
    });

    describe('create', () => {
        it('deve retornar error ao não coseguir criar um novo carros', async () => {

            const mockCar = generateMockCars(1);

            (carsRepository.create as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao criar novo carros');
            });

            await expect(carService.create(mockCar)).rejects.toThrow('Erro ao criar novo carros');
        });
    });

    describe('update', () => {
        it('deve atualizar um carros existente', async () => {
            const carId = '123456';
            const mockCars: ICar[] = generateMockCars(1);

            (carsRepository.findByIdAndUpdate as jest.Mock).mockReturnValue(mockCars[0]);

            const result = await carService.update(carId, mockCars[0]);
            expect(result).toEqual(mockCars[0]);
        });
    });

    describe('update', () => {
        it('deve retornar erro ao não conseguir atualizar um carros existente', async () => {
            const carId = '123456';
            const mockCar = generateMockCars(1);

            (carsRepository.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao atualizar carros');
            });

            await expect(carService.update(carId, mockCar)).rejects.toThrow('Erro ao atualizar carros');
        });
    });


    describe('delete', () => {
        it('deve excluir um carros pelo ID', async () => {
            const carId = '123456';

            (carsRepository.findByIdAndDelete as jest.Mock).mockReturnValue(carId);

            const result = await carService.delete(carId);
            expect(result).toEqual(carId);
        });
    });

    describe('delete', () => {
        it('deve retornar erro ao não conseguir excluir um carros pelo ID', async () => {
            const carId = '123456';

            (carsRepository.findByIdAndDelete as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao excluir carros');
            });

            await expect(carService.delete(carId)).rejects.toThrow('Erro ao excluir carros');
        });
    });

    describe('finishBids', () => {
        it('deve atualizar um carro para que seu status de leilão seja finalizado', async () => {
            const carId = '123456';
            const mockCars: ICar[] = generateMockCars(1);

            (carsRepository.findByIdAndUpdate as jest.Mock).mockReturnValue(mockCars[0]);

            const result = await carService.update(carId, mockCars[0]);
            expect(result).toEqual(mockCars[0]);
        });
    });

    describe('finishBids', () => {
        it('deve retornar um error ao tentar atualizar um carro para que seu status de leilão seja finalizado', async () => {
            const carId = '123456';
            const mockCar = generateMockCars(1);

            (carsRepository.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao finalizar leilão do carro');
            });

            await expect(carService.update(carId, mockCar)).rejects.toThrow('Erro ao finalizar leilão do carro');
        });
    });


});