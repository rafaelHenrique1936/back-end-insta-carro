import * as mongoose from 'mongoose';
import carsSchema from '../models/carsSchema';
export default mongoose.model('cars', carsSchema);