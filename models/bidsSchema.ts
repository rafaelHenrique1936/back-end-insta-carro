import { Schema, Document, Types } from 'mongoose';

export interface Bid extends Document {
    user: Types.ObjectId;
    car: Types.ObjectId;
    amount: number;
    timestamp?: Date;
}

const bidsSchema: Schema<Bid> = new Schema<Bid>({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true }, 
    car: { type: Schema.Types.ObjectId, ref: 'cars', required: true }, 
    amount: { type: Number, required: true }, 
    timestamp: { type: Date, default: Date.now }
});

export default bidsSchema;