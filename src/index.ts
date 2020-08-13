
import express from "express";
import http from "http";
import socketIo from "socket.io";
import CanvasesManager from "./CanvasesManager";

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const canvasesManager = new CanvasesManager;

io.on("connection", socket => {
    console.log("소켓만들어짐");
    socket.on("ping", _ => {
        console.log("핑옴");
        socket.emit("pong", "HI");
    });
});

server.listen(80, () => {
    console.log("서버 돌림");
});

canvasesManager.getCanvas("https://www.naver.com/");