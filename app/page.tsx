"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
    };

    ws.onmessage = (event) => {
      setReceiverMessage(event.data);
      console.log("receiverMessage", event.data);
    };

    ws.onclose = () => {
      console.log("Disconnected from the WebSocket server");
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
      ws.send(message);
    };

    ws.onmessage = (event) => {
      setReceiverMessage(event.data);
    };
  };

  return (
    <div className="mx-auto max-w-2xl p-5">
      <p className="font-bold text-2xl">🧦&nbsp;WebSocket Example</p>
      <hr />
      <div className="mt-4">
        <input
          type="text"
          className="border-1 border-purple-400 rounded-lg px-3 py-1"
          placeholder="Enter the message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-purple-500 text-white rounded-lg px-3 py-1 ml-2 hover:bg-purple-600 active:bg-purple-700 duration-100 cursor-pointer"
          onClick={() => sendMessage()}
        >
          Send
        </button>
        <p>Receiver Message</p>
        <p>{receiverMessage}</p>
      </div>
    </div>
  );
}
