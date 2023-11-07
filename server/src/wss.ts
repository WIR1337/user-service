import http from "http";
import { Server } from "socket.io";

import { validateRole } from "./sockethelpers/SocketRoleAuth";

class WebSocketServer {
  private io: Server;
  constructor(httpServer: http.Server) {
    this.io = new Server(httpServer);

    this.io.on("connection", (socket) => {
      socket.on("message", (msg) => {
        console.log("message: " + msg);
        // this.io.emit('hello','world'); 
        socket.broadcast.emit('hello','world');
      });
    });

    this.io.use(validateRole("admin"));
  }
}

export default WebSocketServer;
