import mongoose,{ Schema, Model } from "mongoose";

interface Category {
    name: string,
    avtar: string
}

const categorySchema = new Schema<Category, Model<Category>>({
    name: { type: String, required: true },
    avtar: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
});

const Category = mongoose.model<Category>('Category', categorySchema);

export default Category;

