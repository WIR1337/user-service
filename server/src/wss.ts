import http from "http";
import { Server } from "socket.io";
import { SocketError } from "./wss/Errors";
import { validMessage } from "./wss/MessageValidator";
import { validateRole } from "./wss/SocketAuth";

class WebSocketServer {
  private io: Server;
  constructor(httpServer: http.Server) {
    this.io = new Server(httpServer);

    this.io.on("connection", (socket) => {
      socket.on("message", (msg) => {
        if (validMessage(msg)) {
          socket.broadcast.emit("message", msg);
        } else {
          socket.emit('error', SocketError.badRequest()) 
        }
      });
    });
    
    this.io.use(validateRole("admin"));
  }


}

export default WebSocketServer;
