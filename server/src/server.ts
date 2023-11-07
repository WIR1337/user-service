import http from 'http';
import { Server } from "socket.io";
import { app } from "./app.js";
const server = http.createServer(app)
const io = new Server(server)

const PORT = 8000;

server.listen(PORT, () =>
  console.log("Server running and listen on port " + PORT)
);

io.on('connection', () => {
    console.log('new connection')
})
