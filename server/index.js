import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";
import cardsRoute from "./routes/cards.js";
import decksRoute from "./routes/decks.js";
import roomsRoute from "./routes/rooms.js";
import { Server } from "socket.io";
import http from "http";
import { randomCards } from "./utils/randomCards.js";

const app = express();
const server = http.createServer(app);

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/cards", cardsRoute);
app.use("/api/decks", decksRoute);
app.use("/api/rooms", roomsRoute);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = {};

io.on("connection", (socket) => {
  socket.on("join", ({ roomId, userData }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = {
        id: roomId,
        gameState: [],
        currentPlayerIndex: 0,
        players: [],
      };
    }

    const room = rooms[roomId];
    const userIndex = room.gameState.findIndex(
      (user) => user.username === userData.username
    );

    if (!room.players.includes(socket.id)) {
      room.players.push(socket.id);
    }

    const currentCards = randomCards(userData.deck.cards);
    const cardsInDeck = userData.deck.cards.filter((el) =>
      currentCards.some((card) => card.name === el.name)
    );

    if (userIndex === -1) {
      room.gameState.push({
        username: userData.username,
        fraction: userData.deck.fraction.name,
        cardsOnTable: [],
        currentCards: currentCards,
        cardsInDeck: cardsInDeck,
        lostCards: [],
        totalPower: 0,
        lostRounds: 0,
      });
    }

    socket.join(roomId);

    if (room.gameState.length === 2) {
      io.to(roomId).emit("gameState", { gameState: room.gameState });
    }
  });

  socket.on("pushCard", ({ roomId, username, cardIndex }) => {
    const room = rooms[roomId];
    if (!room) return;

    const userIndex = room.gameState.findIndex(
      (user) => user.username === username
    );

    if (userIndex !== -1 && userIndex === room.currentPlayerIndex) {
      const user = room.gameState[userIndex];
      const card = user.currentCards[cardIndex];

      user.currentCards.splice(cardIndex, 1);
      user.cardsOnTable.push(card);
      user.totalPower += card.power;

      room.currentPlayerIndex =
        (room.currentPlayerIndex + 1) % room.gameState.length;

      const allPlayersOutOfCards = room.gameState.every(
        (player) => player.currentCards.length === 0
      );

      if (allPlayersOutOfCards) {
        const winner = room.gameState.reduce((prev, current) =>
          prev.totalPower > current.totalPower ? prev : current
        );

        io.to(roomId).emit("gameOver", {
          winner: winner.username,
          gameState: room.gameState,
        });

        delete rooms[roomId];
        return;
      }
    }

    io.to(roomId).emit("gameState", { gameState: room.gameState });
  });

  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      const room = rooms[roomId];
      const playerIndex = room.players.indexOf(socket.id);

      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);

        if (room.players.length === 0) {
          delete rooms[roomId];
        }

        break;
      }
    }
  });
});

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zustwai.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    );
    server.listen(process.env.PORT, () => {
      console.log("Server started");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
