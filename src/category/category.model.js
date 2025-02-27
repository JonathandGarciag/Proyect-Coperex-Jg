import mongoose from "mongoose";
import { preventDefaultCategoryDeletion } from "../middlewares/notDelete-category.js";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    isDefault: {
        type: Boolean,
        default: false 
    },
    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

CategorySchema.pre("findOneAndDelete", preventDefaultCategoryDeletion);

export default mongoose.model("Category", CategorySchema);
