import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    generatedAt: {
        type: Date,
        default: Date.now
    },
    data: {
        type: Array,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
    },
},
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("Report", ReportSchema);
