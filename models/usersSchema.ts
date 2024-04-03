import { Schema, Document } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    active: boolean;
}

const usersSchema: Schema<User> = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    active: { type: Boolean, required: true }
});

export default usersSchema;
