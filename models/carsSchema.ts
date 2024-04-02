import * as mongoose from 'mongoose';

const carsSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    models: { type: String, required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true }, // Quilometragem
    price: { type: Number, required: true }, // Preço de venda
    minimumPrice: { type: Number, required: true }, // Preço  minimo de venda
    transmission: { type: String, required: true }, // Tipo de Transmissão 
    fuelType: { type: String, required: true }, // Tipo de combustivel 
    engineSize: { type: Number, required: true }, // Tamanho do motor (em litros)
    numOfSeats: { type: Number, required: true }, // Número de assentos
    numOfDoors: { type: Number, required: true }, // Número de portas
    color: { type: String, required: true },
    condition: { type: String, required: true }, // Condição do carro (usado, novo, etc.)
    features: { type: String, required: true }, // Lista de características
    auctionEndDate: { type: Date }, // Data de encerramento do leilão

})

export default carsSchema;