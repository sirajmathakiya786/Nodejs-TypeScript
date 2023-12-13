import mongoose,{ Schema, Model } from 'mongoose';

interface User {
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    isDeleted: boolean
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new Schema<User, Model<User>>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    isDeleted: { type: Boolean, default:false}
}, {
    versionKey: false,
    timestamps: true
})

const User = mongoose.model<User>('User', userSchema);

export default User;