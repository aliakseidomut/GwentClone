import mongoose from "mongoose";

const FractionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    leader: {
        type: {
            name: {
                type: String,
                required: true
            },
            ability: {
                type: String,
                required: true
            }
        }
    },
    ability: {
        type: String,
        required: true,
    }
})

export default mongoose.model('Fraction', FractionSchema)