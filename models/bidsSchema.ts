import * as mongoose from 'mongoose';

const bidsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, 
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'cars', required: true }, 
    amount: { type: Number, required: true }, 
    timestamp: { type: Date, default: Date.now }

})

export default bidsSchema;