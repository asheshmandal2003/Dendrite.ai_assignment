import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export type ChatModalProps = {
  id: String | undefined;
  messages: [any];
  setMessages: Dispatch<SetStateAction<any>>;
  websocket: Socket | null;
};
