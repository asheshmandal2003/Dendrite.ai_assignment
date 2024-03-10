import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export const handleUndo = (
  lines: Array<Object>,
  setLines: Dispatch<SetStateAction<Array<Object>>>,
  setStoreLastElements: Dispatch<SetStateAction<Array<Object>>>,
  webSocket: Socket | null,
  id: Number
) => {
  const length = lines.length;
  if (length === 0) return;
  setStoreLastElements((prevElements) => [...prevElements, lines[length - 1]]);
  setLines((prevLines) => prevLines.slice(0, -1));
  if (webSocket) {
    webSocket.emit("undo", {
      id: webSocket.id,
      roomId: id,
    });
  }
};

export const handleRedo = (
  lines: Array<Object>,
  setLines: Dispatch<SetStateAction<Array<Object>>>,
  storeLastElements: Array<Object>,
  setStoreLastElements: Dispatch<SetStateAction<Array<Object>>>,
  webSocket: Socket | null,
  roomId: Number
) => {
  const length = storeLastElements.length;
  if (length === 0) return;
  setLines((prevLines) => [...prevLines, storeLastElements[length - 1]]);
  setStoreLastElements((prevElements) => {
    return prevElements.slice(0, -1);
  });
  if (webSocket) {
    webSocket.emit("redo", {
      id: webSocket.id,
      roomId: roomId,
      changes: lines[length - 1],
    });
  }
};
