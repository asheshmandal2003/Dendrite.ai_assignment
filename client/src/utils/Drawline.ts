import { Dispatch, MutableRefObject, SetStateAction } from "react";

export const handleMouseDownForDrawLine = (
  e: any,
  isDrawing: MutableRefObject<boolean>,
  setLines: Dispatch<SetStateAction<any>>,
  tool: String,
  color: String,
  size: Number
) => {
  isDrawing.current = true;
  const pos = e.target.getStage().getPointerPosition();
  const lineDetails = { tool, color, size, points: [pos.x, pos.y] };
  console.log(lineDetails);
  setLines((prevlines: any) => [...prevlines, lineDetails]);
};

export const handleMouseMoveForDrawLine = (
  e: any,
  isDrawing: MutableRefObject<boolean>,
  lines: any,
  setLines: Dispatch<SetStateAction<any>>,
  setPointer: Dispatch<SetStateAction<Object>>
) => {
  if (!isDrawing.current) {
    return;
  }
  const stage = e.target.getStage();
  const len = lines.length;
  const point = stage.getPointerPosition();
  setPointer({ x: point.x, y: point.y });
  let lastLine = lines[len - 1];
  lastLine.points = lastLine.points.concat([point.x, point.y]);
  lines.splice(len - 1, 1, lastLine);
  setLines(lines.concat());
};

export const handleMouseUpForDrawLine = (
  isDrawing: MutableRefObject<boolean>
) => {
  isDrawing.current = false;
};
