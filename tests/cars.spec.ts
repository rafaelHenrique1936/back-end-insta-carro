import carsRepository from '../repository/carsRepository';
import carService from '../services/carsService';
import { expect, jest, describe, it } from '@jest/globals';
import { Car } from '../models/carsSchema';
import CarModel from '../repository/carsRepository';


jest.mock('../repository/carsRepository');

const generateMockCars = (count: number): Car[] => {
    const mockCars: Car[] = [];
    for (let i = 0; i < count; i++) {
        const newCar = new CarModel({
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
        mockCars.push(newCar);
    }
    return mockCars;
};



describe('carService', () => {
    describe('get', () => {
        it('should return a paginated list of cars', async () => {
            const page = 1;
            const perPage = 10;

            const mockCars: Car[] = generateMockCars(10);
            (carsRepository.find as jest.Mock).mockReturnValue(mockCars);

            const result = await carService.get(page, perPage);
            expect(result).toEqual(mockCars);
        });

        it('should throw an error when failing to fetch a paginated list of cars', async () => {
            const page = 1;
            const perPage = 10;

            (carsRepository.find as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao consultar carros');
            });

            await expect(carService.get(page, perPage)).rejects.toThrow('Erro ao consultar carros');
        });
    });

    describe('getById', () => {
        it('should return a car by ID', async () => {
            const carId = '123456';

            const mockCars: Car[] = generateMockCars(1);
            (carsRepository.findById as jest.Mock).mockReturnValue(mockCars);

            const result = await carService.getById(carId);

            expect(result).toEqual(mockCars);
        });

        it('should throw an error when failing to fetch a car by ID', async () => {
            const carId = '123456';

            (carsRepository.findById as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao buscar carros pelo ID');
            });

            await expect(carService.getById(carId)).rejects.toThrow('Erro ao buscar carros pelo ID');
        });
    });

    describe('create', () => {
        it('should create a new car', async () => {
            const mockCars: Car[] = generateMockCars(1);
            (carsRepository.create as jest.Mock).mockReturnValue(mockCars[0]);

            const result = await carService.create(mockCars[0]);

            expect(result).toEqual(mockCars[0]);
        });

        it('should throw an error when failing to create a new car', async () => {

            const mockCars: Car[] = generateMockCars(1);

            (carsRepository.create as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao criar novo carros');
            });

            await expect(carService.create(mockCars[0])).rejects.toThrow('Erro ao criar novo carros');
        });
    });

    describe('update', () => {
        it('should update an existing car', async () => {
            const carId = '123456';
            const mockCars: Car[] = generateMockCars(1);

            (carsRepository.findByIdAndUpdate as jest.Mock).mockReturnValue(mockCars[0]);

            const result = await carService.update(carId, mockCars[0]);
            expect(result).toEqual(mockCars[0]);
        });

        it('should throw an error when failing to update an existing car', async () => {
            const carId = '123456';
            const mockCars: Car[] = generateMockCars(1);


            (carsRepository.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao atualizar carros');
            });

            await expect(carService.update(carId, mockCars[0])).rejects.toThrow('Erro ao atualizar carros');
        });
    });

    describe('delete', () => {
        it('should delete a car by ID', async () => {
            const carId = '123456';

            (carsRepository.findByIdAndDelete as jest.Mock).mockReturnValue(carId);

            const result = await carService.delete(carId);
            expect(result).toEqual(carId);
        });

        it('should throw an error when failing to delete a car by ID', async () => {
            const carId = '123456';

            (carsRepository.findByIdAndDelete as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao excluir carros');
            });

            await expect(carService.delete(carId)).rejects.toThrow('Erro ao excluir carros');
        });
    });

    describe('finishBids', () => {
        it('should update a car to finish its auction status', async () => {
            const carId = '123456';
            const mockCars: Car[] = generateMockCars(1);

            (carsRepository.findByIdAndUpdate as jest.Mock).mockReturnValue(mockCars[0]);

            const result = await carService.update(carId, mockCars[0]);
            expect(result).toEqual(mockCars[0]);
        });

        it('should throw an error when failing to update a car to finish its auction status', async () => {
            const carId = '123456';
            const mockCars: Car[] = generateMockCars(1);

            (carsRepository.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao finalizar leilão do carro');
            });

            await expect(carService.update(carId, mockCars[0])).rejects.toThrow('Erro ao finalizar leilão do carro');
        });
    });
});
