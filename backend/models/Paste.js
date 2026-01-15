import mongoose from "mongoose";

const PasteSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    Title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    label: {
        type: String,
        enum: ["none", "Minato", "Kushina"],
        default: "none"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Paste", PasteSchema);