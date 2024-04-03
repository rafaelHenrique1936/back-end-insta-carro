import bidService from '../services/bidsService';
import bidsRepository from '../repository/bidsRepository';
import { expect, jest, describe, it, } from '@jest/globals';
const mongoose = require('mongoose');

interface IBid {
    user: String,
    car: String,
    amount: Number
}

jest.mock('../repository/bidsRepository');
const generateMockBids = (count: number): IBid[] => {
    const mockBids: IBid[] = [];
    for (let i = 0; i < count; i++) {
        mockBids.push({
            user: new mongoose.Types.ObjectId('5f28f414c88c640a6096c2aa'),
            car: new mongoose.Types.ObjectId('5f28f414c88c640a6096c2bb'),
            amount: 10000
        });
    }
    return mockBids;
};

describe('bidService', () => {

    describe('update', () => {
        it('deve atualizar um lance existente', async () => {
            const bidId = '123456';
            const mockBids: IBid[] = generateMockBids(1);

            (bidsRepository.findByIdAndUpdate as jest.Mock).mockReturnValue(mockBids[0]);

            const result = await bidService.update(bidId, mockBids[0]);
            expect(result).toEqual(mockBids[0]);
        });
    });

    describe('update', () => {
        it('deve retornar erro ao não conseguir atualizar um lance existente', async () => {
            const bidId = '123456';
            const mockBid = generateMockBids(1);

            (bidsRepository.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao atualizar lance');
            });

            await expect(bidService.update(bidId, mockBid)).rejects.toThrow('Erro ao atualizar lance');
        });
    });


    describe('delete', () => {
        it('deve excluir um lance pelo ID', async () => {
            const bidId = '123456';

            (bidsRepository.findByIdAndDelete as jest.Mock).mockReturnValue(bidId);

            const result = await bidService.delete(bidId);
            expect(result).toEqual(bidId);
        });
    });

    describe('delete', () => {
        it('deve retornar erro ao não conseguir excluir um lance pelo ID', async () => {
            const bidId = '123456';

            (bidsRepository.findByIdAndDelete as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao excluir lance');
            });

            await expect(bidService.delete(bidId)).rejects.toThrow('Erro ao excluir lance');
        });
    });

});