require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Define Note Schema & Model
const NoteSchema = new mongoose.Schema({
  room: String,
  content: String
});
const Note = mongoose.model("Note", NoteSchema);

// WebSocket Events
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("joinRoom", async (room) => {
    socket.join(room);
    const note = await Note.findOne({ room }) || new Note({ room, content: "" });
    socket.emit("loadNote", note.content);
    socket.to(room).emit("notification", `A user joined room: ${room}`);
  });

  socket.on("editNote", async ({ room, content }) => {
    await Note.findOneAndUpdate({ room }, { content }, { upsert: true });
    socket.to(room).emit("noteUpdated", content);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// REST API Endpoints
app.get("/notes/:room", async (req, res) => {
  const { room } = req.params;
  const note = await Note.findOne({ room }) || { content: "" };
  res.json(note);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
