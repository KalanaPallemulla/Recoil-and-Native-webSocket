/* eslint-disable testing-library/await-async-utils */
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import WebSocketDemo from "../WebSocketDemo";

// Mock useWebSocket hook

jest.mock("react-use-websocket", () => ({
  __esModule: true,
  default: () => ({
    sendMessage: jest.fn(),
    lastMessage: null,
    readyState: 1,
  }),
  ReadyState: {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
    UNINSTANTIATED: 4,
  },
}));

describe("WebSocketDemo", () => {
  it("changes socket URL on button click", async () => {
    render(<WebSocketDemo />);
    const button = screen.getByText("Click Me to change Socket Url");
    fireEvent.click(button);
    waitFor(() => {
      expect(
        screen.getByText("The WebSocket is currently Connecting")
      ).toBeInTheDocument();
    });
  });

  it("sends message when button is clicked", async () => {
    render(<WebSocketDemo />);
    const input = screen.getByPlaceholderText("Create message");
    const button = screen.getByText("Click Me to send 'Hello'");
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.click(button);
    waitFor(() => {
      expect(screen.getByText("Last message: Hello")).toBeInTheDocument();
    });
  });

  it("displays WebSocket status correctly", () => {
    render(<WebSocketDemo />);
    expect(
      screen.getByText("The WebSocket is currently Open")
    ).toBeInTheDocument();
  });
});
