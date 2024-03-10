import { Stage } from "konva/lib/Stage";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export type SidebarProps = {
  tool: String;
  color: String;
  setTool: Dispatch<SetStateAction<String>>;
  lines: Object[];
  setLines: Dispatch<SetStateAction<Object[]>>;
  storeLastElements: Object[];
  setStoreLastElements: Dispatch<SetStateAction<Object[]>>;
  setColor: Dispatch<SetStateAction<String>>;
  setSize: Dispatch<SetStateAction<Number>>;
  webSocket: Socket | null;
  roomId: Number;
  stageRef: MutableRefObject<Stage>;
};
