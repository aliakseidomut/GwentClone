import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'
import cardsRoute from './routes/cards.js'
import decksRoute from './routes/decks.js'
import roomsRoute from './routes/rooms.js'
import { Server } from 'socket.io'
import http from 'http'
import Room from './models/Room.js'
import { randomCards } from './utils/randomCards.js'

const app = express()
const server = http.createServer(app);

dotenv.config();

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/cards', cardsRoute)
app.use('/api/decks', decksRoute)
app.use('/api/rooms', roomsRoute)

const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  
  const roomData = {
    id: null,
    gameState: [],
  };
  
  io.on('connection', (socket) => {
    socket.on('join', ({ roomId, userData }) => {
      roomData.id = roomId;
  
      const userIndex = roomData.gameState.findIndex((user) => user.username === userData.username);
  
      const currentCards = randomCards(userData.deck.cards);
      const cardsInDeck = userData.deck.cards.filter((el) =>
        currentCards.some((card) => card.name === el.name)
      );
  
      if (userIndex === -1) {
        roomData.gameState.push({
          username: userData.username,
          fraction: userData.deck.fraction.name,
          cardsOnTheTable: [],
          currentCards: currentCards,
          cardsInDeck: cardsInDeck,
          lostCards: [],
          totalPower: 0,
          lostRounds: 0,
        });
      }
  
      socket.join(roomId);
  
      if (roomData.gameState.length === 2) {
        io.to(roomId).emit('gameState', { gameState: roomData.gameState });
      }
    });
  
    socket.on('disconnect', () => {});
  });



const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zustwai.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
        server.listen(process.env.PORT, () => {console.log('Server started')})
    } catch (err) {
        console.log(err)
    }
}
start()