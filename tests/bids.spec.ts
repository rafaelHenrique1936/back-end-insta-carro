import bidService from '../services/bidsService';
import bidsRepository from '../repository/bidsRepository';
import { expect, jest, describe, it, } from '@jest/globals';
import { Bid } from '../models/bidsSchema';
import mongoose from 'mongoose';
import BidModel from '../repository/bidsRepository';


jest.mock('../repository/bidsRepository');

const generateMockBids = (count: number): Bid[] => {
    const mockBids: Bid[] = [];
    for (let i = 0; i < count; i++) {
        const newBid = new BidModel({
            user: new mongoose.Types.ObjectId('5f28f414c88c640a6096c2aa'),
            car: new mongoose.Types.ObjectId('5f28f414c88c640a6096c2bb'),
            amount: 10000
        });
        mockBids.push(newBid);
    }
    return mockBids;
};
describe('Bid Service', () => {
    describe('update', () => {
        it('should update an existing bid', async () => {
            const bidId = '123456';
            const mockBids: Bid[] = generateMockBids(1);

            (bidsRepository.findByIdAndUpdate as jest.Mock).mockReturnValue(mockBids[0]);

            const result = await bidService.update(bidId, mockBids[0]);
            expect(result).toEqual(mockBids[0]);
        });

        it('should throw an error when failing to update an existing bid', async () => {
            const bidId = '123456';
            const mockBid = generateMockBids(1)[0];

            (bidsRepository.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao atualizar lance');
            });

            await expect(bidService.update(bidId, mockBid)).rejects.toThrow('Erro ao atualizar lance');
        });
    });

    describe('delete', () => {
        it('should delete a bid by ID', async () => {
            const bidId = '123456';

            (bidsRepository.findByIdAndDelete as jest.Mock).mockReturnValue(bidId);

            const result = await bidService.delete(bidId);
            expect(result).toEqual(bidId);
        });

        it('should throw an error when failing to delete a bid by ID', async () => {
            const bidId = '123456';

            (bidsRepository.findByIdAndDelete as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Erro ao excluir lance');
            });

            await expect(bidService.delete(bidId)).rejects.toThrow('Erro ao excluir lance');
        });
    });
});
