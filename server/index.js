import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'
import cardsRoute from './routes/cards.js'
import decksRoute from './routes/decks.js'

const app = express()
dotenv.config();

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/cards', cardsRoute)
app.use('/api/decks', decksRoute)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zustwai.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
        app.listen(process.env.PORT, () => {console.log('Server started')})
    } catch (err) {
        console.log(err)
    }
}
start()