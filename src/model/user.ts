import mongoose,{ Schema, Model } from 'mongoose';

interface User {
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    role: string
    isDeleted: boolean
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new Schema<User, Model<User>>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ['admin','user'],default:'user'},
    isDeleted: { type: Boolean, default:false}
}, {
    versionKey: false,
    timestamps: true
})

const User = mongoose.model<User>('User', userSchema);

export default User;