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
  setLines((prevlines: any) => [
    ...prevlines,
    { tool, color, size, points: [pos.x, pos.y] },
  ]);
};

export const handleMouseMoveForDrawLine = (
  e: any,
  isDrawing: MutableRefObject<boolean>,
  lines: any,
  setLines: Dispatch<SetStateAction<any>>
) => {
  if (!isDrawing.current) {
    return;
  }
  const stage = e.target.getStage();
  const point = stage.getPointerPosition();
  let lastLine = lines[lines.length - 1];
  lastLine.points = lastLine.points.concat([point.x, point.y]);
  lines.splice(lines.length - 1, 1, lastLine);
  setLines(lines.concat());
};

export const handleMouseUpForDrawLine = (
  isDrawing: MutableRefObject<boolean>
) => {
  isDrawing.current = false;
};
