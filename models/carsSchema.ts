import * as mongoose from 'mongoose';

const carsSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    models: { type: String, required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true }, 
    price: { type: Number, required: true }, 
    minimumPrice: { type: Number, required: true }, 
    transmission: { type: String, required: true }, 
    fuelType: { type: String, required: true }, 
    engineSize: { type: Number, required: true }, 
    numOfSeats: { type: Number, required: true }, 
    numOfDoors: { type: Number, required: true }, 
    color: { type: String, required: true },
    condition: { type: String, required: true },
    features: { type: String, required: true }, 
    auctionEndDate: { type: Date, index: true  }, 

})

export default carsSchema;