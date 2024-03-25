import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState("wss://echo.websocket.org");
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl("wss://demos.kaazing.com/echo"),
    []
  );

  const handleClickSendMessage = useCallback(() => {
    sendMessage(inputText);
    setTimeout(() => {
      setInputText("");
    }, 1000);
  }, [inputText]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      <input
        placeholder="Create message"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          console.log("e.target.value", e.target.value);
        }}
      />
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus} </span>
      {lastMessage ? <span> Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketDemo;
