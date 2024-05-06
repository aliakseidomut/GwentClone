import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

export default mongoose.model('Room', RoomSchema)