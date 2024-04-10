import mongoose from "mongoose";

const DeckSchema = new mongoose.Schema({
    fraction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fraction'
    },
    cards: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card'
        }
    ],
    active: {
        type: Boolean,
        required: true,
    }
})

export default mongoose.model('Deck', DeckSchema)