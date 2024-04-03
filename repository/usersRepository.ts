import mongoose, { Model } from 'mongoose';
import usersSchema, { User } from '../models/usersSchema';

const UserModel: Model<User> = mongoose.model<User>('users', usersSchema);

export default UserModel;
