import * as mongoose from 'mongoose';

const bidsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, // Referência ao usuário
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'cars', required: true }, // Referência ao carro
    amount: { type: Number, required: true }, // Valor do lance
    timestamp: { type: Date, default: Date.now } // Timestamp do lance

})

export default bidsSchema;