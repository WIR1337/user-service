import { useEffect, useRef, useState } from "react";
export function useWebSocket() {
  const [serviceStatus, setServiceStatus] = useState("");
  var socket: WebSocket;
  var socketRef = useRef<WebSocket>();
  useEffect(() => {
    socket = new WebSocket("ws://localhost:8080");
    socketRef.current = socket;
    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      const data = event.data;
      console.log("Received:", data);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
    return () => {
      socket.close();
    };
  }, []);
  function sendMessage(message: any) {
    // if (serviceStatus == "Ready") {

    console.log("SENDED MESSAGE :", message);
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(message));
    }
    // }
  }
  return { sendMessage };
}
