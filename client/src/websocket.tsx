import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
export function useWebSocket() {
  const [serviceStatus, setServiceStatus] = useState("");
  var socket: Socket;
  var socketRef = useRef<Socket>();
  useEffect(() => {
    socket = io("http://localhost:8000", {
      auth: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoid2lyMTMzNyIsImlkIjo3LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTkzNDg5MjYsImV4cCI6MTY5OTQzNTMyNn0.Q7nk8LJ-tF81v4R5WbtU41vp-waF9JEr3-8YyBWvaAM",
      },
    });
    socketRef.current = socket
    socket.on("disconnect", () => {
      console.log("Disconnect");
    });

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });
    socket.on("message", (msg) => {
      console.log("DSADAS " + JSON.stringify(msg));
    });
    socket.on("error", (msg) => {
      console.log("Error : " + JSON.stringify(msg));
    });

    return () => {
      socket.close();
    };
  }, []);
  function sendMessage(message: any) {
    console.log("SENDED MESSAGE :", message);
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(message));
    }
  }
  return { sendMessage };
}
