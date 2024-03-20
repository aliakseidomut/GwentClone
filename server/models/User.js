import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }]
})

export default mongoose.model('User', UserSchema)