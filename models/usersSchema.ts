import * as mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    active: { type: Boolean, required: true }
});

export default usersSchema;