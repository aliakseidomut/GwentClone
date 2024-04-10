import Deck from "../models/Deck.js";
import User from "../models/User.js";

export const getDecks = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.decks.map((deck) => {
                return Deck.findById(deck._id).populate(['fraction', 'cards'])
            })
        )
        
        res.json(list)
    } 
    catch (err) {
        console.log(err);
    }
}

export const pushCard = async (req, res) => {
    try {
        const { deckId, cardId } = req.body

        await Deck.findByIdAndUpdate(deckId, {
            $push: { cards: cardId }
        });
    }
    catch (err) {
        console.log(err);
    }
}

export const deleteCard = async (req, res) => {
    try {
        const { deckId, cardId } = req.body

        await Deck.findByIdAndUpdate(deckId, {
            $pull: { cards: cardId }
        });
    }
    catch (err) {
        console.log(err);
    }
}
