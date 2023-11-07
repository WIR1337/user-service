import http from "http";
import { Server } from "socket.io";

import { validateRole } from "./socketmiddleware/SocketRoleAuth";

class WebSocketServer {
  private io: Server;
  constructor(httpServer: http.Server) {
    this.io = new Server(httpServer);

    this.io.on("connection", (socket) => {
      console.log("new connection");
    });

    this.io.use(validateRole('admin'));
  }
}

export default WebSocketServer;
