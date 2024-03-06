import { Dispatch, SetStateAction } from "react";

export type CanvasProps = {
  lines: Object[];
  setLines: Dispatch<SetStateAction<Object[]>>;
  tool: String;
  color: String;
  size: Number;
};
