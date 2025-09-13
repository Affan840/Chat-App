import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL || "http://localhost:5173"]
    }
})

export function getSocketReceiverId(userId) {
    return usersSocketMap[userId];
}

const usersSocketMap = {};

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        usersSocketMap[userId] = socket.id;
        console.log('User connected:', userId);
    }

    io.emit("getOnlineUsers", Object.keys(usersSocketMap));

   socket.on("disconnect", () => {
       console.log("user disconnected");
       delete usersSocketMap[userId];
       io.emit("getOnlineUsers", Object.keys(usersSocketMap));
   });
});

export {io, app, server};