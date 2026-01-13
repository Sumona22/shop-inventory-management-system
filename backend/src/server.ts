// src/server.ts
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db";
import app from "./app";

dotenv.config();

/* -------------------- DB Connection -------------------- */
connectDB();

/* -------------------- HTTP Server -------------------- */
const server = http.createServer(app);

/* -------------------- Socket.IO -------------------- */
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🔔 Socket connected:", socket.id);

  socket.on("join", (userId: string) => {
    socket.join(userId);
    console.log(`👤 User joined room: ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

/* -------------------- Server -------------------- */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
