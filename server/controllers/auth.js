import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const isNameUsed = await User.findOne({ username })
        if (isNameUsed) {
            return res.json({
                message: 'Пользователь с данным именем уже существует'
            })            
        }
        
        const isEmailUsed = await User.findOne({ email }) 
        if (isEmailUsed) {
            return res.json({
                message: 'Пользователь с данным email уже существует'
            })
        }

        const newUser = new User({
            username,
            email,
            password
        })

        await newUser.save()

        res.json({
            newUser,
            message: 'Регистрация прошла успешно'
        })
    } catch (err) {
        res.json({
            message: 'Ошибка при регистрации'
        })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })
        if (!user) {
            return res.json({
                message: 'Такого пользователя не существует'
            })
        }

        if(password !== user.password) {
            return res.json({
                message: 'Неверный пароль'
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
            message: 'Авторизация прошла успешно'
        })
    } catch (err) {
        res.json({
            message: 'Ошибка при авторизации'
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findOne(req.userId)
        if (!user) {
            return res.json({
                message: 'Такого пользователя не существует'
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
            message: 'Авторизация прошла успешно'
        })
    } catch (err) {
        res.json({
            message: 'Нет доступа'
        });
    }
}