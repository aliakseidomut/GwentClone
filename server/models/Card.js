import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
    },
    power: {
        type: Number,
        required: false,
    },
    ability: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
        unique: true
    },
    fraction: {
        type: String,
        required: true,
    },
    hero: {
        type: Boolean,
        required: true,
    },
})

export default mongoose.model('Card', CardSchema)