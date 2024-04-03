import mongoose, { Model } from 'mongoose';
import carsSchema, { Car } from '../models/carsSchema';

const CarModel: Model<Car> = mongoose.model<Car>('cars', carsSchema);

export default CarModel;
