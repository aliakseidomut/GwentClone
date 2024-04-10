import Card from "../models/Card.js";

export const getCards = async (req, res) => {
    try {
        const cards = await Card.find();
        if (!cards) {
            return res.json({
                error: "Карты не найдены"
            })
        }

        res.json({
            cards
        })
    } 
    catch (err) {
        console.log(err);
    }
}