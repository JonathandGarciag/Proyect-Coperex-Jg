import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        unique: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Role', RoleSchema);