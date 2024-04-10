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
        unique: false
    },
    decks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Deck'
        }
    ]
})

export default mongoose.model('User', UserSchema)