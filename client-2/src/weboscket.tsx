import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { Action, Setter } from "./types/components";


export function useWebSocket(token: string, messageSetter:Setter<Action[]>) {
  var socket: Socket;
  var socketRef = useRef<Socket>();
  useEffect(() => {
    socket = io("http://localhost:8000", {
      auth: {
        token,
      },
    });
    socketRef.current = socket;
    socket.on("disconnect", () => {
      console.log("Disconnect");
    });

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });
    socket.on("message", (msg) => {
      messageSetter(prev => [...prev, msg])
      console.log("Service 2 got message : " + msg);
    });
    socket.on("error", (msg) => {
      console.log("Socket Said Error : " + JSON.stringify(msg));
    });

    return () => {
      socket.close();
    };
  }, []);
  function sendMessage(message: any) {
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(message));
    }
  }
  return { sendMessage };
}
