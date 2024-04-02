import * as mongoose from 'mongoose';
import bidsSchema from '../models/bidsSchema';

export default mongoose.model('bids', bidsSchema);