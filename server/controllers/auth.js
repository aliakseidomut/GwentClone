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

        const newUser = new User({
            username,
            password
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
        const user = await User.findOne(req.userId)
        if (!user) {
            return res.json({
                erorr: 'Такого пользователя не существует'
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
            erorr: 'Авторизация прошла успешно'
        })
    } catch (err) {
        res.json({
            erorr: 'Нет доступа'
        });
    }
}