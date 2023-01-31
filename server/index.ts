import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import crypto from "crypto";

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
    socket.on("join", (nick) => {
        io.emit("message", {
            nick: "System:",
            message: `${nick} has joined the chat`,
            id: crypto.randomBytes(16).toString("hex"),
        });
    })
    console.log("New user connected");
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
    socket.on("message", (message) => {
        io.emit("message", {
            nick: message.nick,
            message: message.message,
            id: crypto.randomBytes(16).toString("hex"),
        });
    })
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});