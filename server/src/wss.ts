import http from "http";
import { Server } from "socket.io";

class WebSocketServer {
  private io: Server;
  constructor(httpServer: http.Server) {
    this.io = new Server(httpServer);
    this.io.on("connection", () => console.log("new connection"));
  }
}

export default WebSocketServer;
