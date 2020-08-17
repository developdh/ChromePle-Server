
import express from "express";
import http from "http";
import socketIoServer from "./socketIo/socketIoServer";
import CanvasManager from "./classes/CanvasManager";
import path from "path";

const canvasManager = new CanvasManager;

const app = express();
const server = http.createServer(app);
const io = socketIoServer(server, canvasManager);

// FOR TEST
app.use(express.static(path.resolve(__dirname, "../static/")));

server.listen(80, () => {
    console.log("[express] 서버 돌림");
});