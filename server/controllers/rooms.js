import Room from "../models/Room.js";

export const deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.body

        await Room.findByIdAndDelete(roomId);
        
        res.json()
    }
    catch (err) {
        res.json({
            error: 'Ошибка при удалении комнаты'
        })
    }
}

export const connectUser = async (req, res) => {
    try {
        const userId = req.userId

        const rooms = await Room.find();
        const freeRooms = rooms.filter(el => el.users.length === 1);
        
        if (freeRooms[0]) {
            await Room.findByIdAndUpdate(freeRooms[0]._id, {
                $push: { users: userId }
            });
        
            res.json(freeRooms[0].populate('users'))
        } else {
            const newRoom = new Room({
                users: [ userId ]
            })

            await newRoom.save()
        
            res.json(newRoom.populate('users'))
        }
    }
    catch (err) {
        res.json({
            error: 'Ошибка подключения'
        })
    }
}

export const getRoom = async (req, res) => {
    try {
        const userId = req.userId;
        const room = await Room.findOne({ users: { $in: [userId] } }).populate('users');
        res.json(room);
    } catch (err) {
        res.json({
            error: 'Ошибка при получении комнаты'
        });
    }
};