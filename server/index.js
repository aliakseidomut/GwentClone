import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()

const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://user:102938@cluster0.zustwai.mongodb.net/gwentClone?retryWrites=true&w=majority&appName=Cluster0")
        app.listen(3002, () => {console.log('Server started')})
    } catch (err) {
        console.log(err)
    }
}

start()