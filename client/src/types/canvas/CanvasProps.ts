import { Stage } from "konva/lib/Stage";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

export type CanvasProps = {
  loading: Boolean;
  lines: Object[];
  setLines: Dispatch<SetStateAction<Object[]>>;
  tool: String;
  color: String;
  size: Number;
  pointer: any;
  setPointer: Dispatch<SetStateAction<any>>;
  stageRef: MutableRefObject<Stage>;
};
