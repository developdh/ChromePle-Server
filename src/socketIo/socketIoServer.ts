
import socketIo, { Socket } from "socket.io";
import http from "http";
import CanvasManager from "../classes/CanvasManager";
import { availableUrls } from "../consts/consts";

interface PenData {
    startX : number,
    startY : number,
    endX : number,
    endY : number,
    radius: number
}

interface DrawData extends PenData {
    rgb: number,
    alpha: number
};

interface EraserDrawData extends PenData {

}

function rgbToRGB(rgb : number) {
    return [rgb>>4*2*2, (rgb>>4*2*1)%(16**2), rgb%(16**2)];
}

function hasUrlRoom(socket : Socket) {
    return Object.keys(socket.rooms).some((roomName : string) => roomName.startsWith("URL_"));
}

function getUrlRoomName(socket : Socket) {
    return Object.keys(socket.rooms).find((roomName : string) => roomName.startsWith("URL_"));
}

function socketIoServer(server : http.Server, canvasManager : CanvasManager) {
    const io = socketIo(server);

    io.on("connection", socket => {
        console.log("[socket.io] 소켓만들어짐");
        socket.on("setUrl", async (url : string) => {
            if(typeof url != "string") return;
            if(!availableUrls.includes(url)) return;
            if(hasUrlRoom(socket)) return;

            console.log(`[socket.io] setUrl :: ${url}`);
            socket.join(`URL_${url}`);
            const canvas = (await canvasManager.getCanvas(url));
            socket.emit("initCanvas", {
                width: canvas.width,
                height: canvas.height,
                dataURL: canvas.toDataURL()
            });
        });
        socket.on("disconnecting", reason => {
            const url_roomName = getUrlRoomName(socket);
            if(!url_roomName) return;
            console.log(`[socket.io] ROOM :: ${url_roomName} 소켓 종료`);

            const url = url_roomName.substr(4);
            const sockets = io.sockets.adapter.rooms[url_roomName].sockets;
            if(sockets && Object.keys(sockets).length) {
                canvasManager.unuseCanvas(url);
            }
        });

        //draw
        socket.on("draw", async (drawData : DrawData) => {
            if(typeof drawData != "object") return;
            const url_roomName = getUrlRoomName(socket);
            if(!url_roomName) return;

            const url = url_roomName.substr(4);

            const {
                startX,
                startY,
                endX,
                endY,
                radius,
                rgb,
                alpha
            } : DrawData = {
                startX: 0,
                startY: 0,
                endX: 0,
                endY: 0,
                radius: 0,
                rgb: 0,
                alpha: 0,
                ...drawData
            };

            const canvas = await canvasManager.getCanvas(url);
            const ctx = canvas.getContext("2d");
            const [ r, g, b ] = rgbToRGB(rgb);

            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineCap = "round";
            ctx.lineWidth = radius;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            io.to(url_roomName).emit("draw", {
                startX,
                startY,
                endX,
                endY,
                radius,
                rgb,
                alpha
            });
        });

        socket.on("erase", async (drawData : EraserDrawData) => {
            if(typeof drawData != "object") return;
            const url_roomName = getUrlRoomName(socket);
            if(!url_roomName) return;

            const url = url_roomName.substr(4);

            const {
                startX,
                startY,
                endX,
                endY,
                radius
            } : EraserDrawData = {
                startX: 0,
                startY: 0,
                endX: 0,
                endY: 0,
                radius: 0,
                ...drawData
            };

            const canvas = await canvasManager.getCanvas(url);
            const ctx = canvas.getContext("2d");

            ctx.globalCompositeOperation = "destination-out";
            ctx.strokeStyle = `rgba(0, 0, 0, 1)`;
            ctx.lineCap = "round";
            ctx.lineWidth = radius;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            io.to(url_roomName).emit("erase", {
                startX,
                startY,
                endX,
                endY,
                radius
            });
        });
    });

    return io;
}

export default socketIoServer;