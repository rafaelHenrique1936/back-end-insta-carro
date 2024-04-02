import * as mongoose from 'mongoose';
import usersSchema from '../models/usersSchema';
export default mongoose.model('users', usersSchema);