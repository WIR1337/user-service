import http from "http";
import { Server } from "socket.io";
import { SocketError } from "./wss/Errors";
import { validMessage } from "./wss/MessageValidator";
import { validateRole } from "./wss/SocketAuth";
const qwe = require("socket.io");

class WebSocketServer {
  private io: Server;
  constructor(httpServer: http.Server) {
    // this.io = new Server(httpServer);
    this.io = qwe(httpServer, {
      cors: {
        origin: ["http://localhost:3001","http://localhost:3002"],
      },
    });

    this.io.on("connection", (socket) => {
      console.log("new connection");
      socket.on("message", (msg) => {
        if (validMessage(msg)) {
          socket.broadcast.emit("message", msg);
        } else {
          socket.emit("error", SocketError.badRequest());
        }
      });
    });

    this.io.use(validateRole("admin"));
  }
}

export default WebSocketServer;
