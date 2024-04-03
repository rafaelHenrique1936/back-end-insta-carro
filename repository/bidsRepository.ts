import mongoose, { Model } from 'mongoose';
import bidsSchema, { Bid } from '../models/bidsSchema';

const BidModel: Model<Bid> = mongoose.model('bids', bidsSchema);

export default BidModel;
