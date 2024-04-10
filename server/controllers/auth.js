import Deck from '../models/Deck.js';
import Fraction from '../models/Fraction.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        const isNameUsed = await User.findOne({ username })
        if (isNameUsed) {
            return res.json({
                error: 'Пользователь с данным именем уже существует'
            })            
        }

        const fractions = await Fraction.find();
        const decksIds = [];

        for (const fraction of fractions) {
            const newDeck = new Deck({
                fraction: fraction._id,
                cards: [],
                active: false
            });
            await newDeck.save();
            decksIds.push(newDeck._id);
        }

        const newUser = new User({
            username,
            password,
            decks: decksIds
        })

        await newUser.save()

        const token = jwt.sign(
            {
                id: newUser._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.json({
            token,
            user: newUser
        })
    } catch (err) {
        res.json({
            error: 'Ошибка при регистрации'
        })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })
        if (!user) {
            return res.json({
                error: 'Такого пользователя не существует'
            })
        }

        if(password !== user.password) {
            return res.json({
                error: 'Неверный пароль'
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.json({
            token,
            user,
        })
    } catch (err) {
        res.json({
            error: 'Ошибка при авторизации'
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.json({
                error: 'Такого пользователя не существует'
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.json({
            token,
            user,
            error: 'Авторизация прошла успешно'
        })
    } catch (err) {
        res.json({
            error: 'Нет доступа'
        });
    }
}