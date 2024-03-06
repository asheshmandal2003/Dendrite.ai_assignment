import { useRef } from "react";
import { Layer, Line, Stage } from "react-konva";
import {
  handleMouseDownForDrawLine,
  handleMouseMoveForDrawLine,
  handleMouseUpForDrawLine,
} from "../../utils/Drawline";
import { CanvasProps } from "../../types/canvas/CanvasProps";
import "../../assets/styles/canvas/CanvasLayout.css";

export function CanvasLayout(props: CanvasProps) {
  const isDrawing = useRef(false);
  return (
    <div>
      <Stage
        className="stage"
        width={800}
        height={460}
        onMouseDown={(e) =>
          handleMouseDownForDrawLine(
            e,
            isDrawing,
            props.setLines,
            props.tool,
            props.color,
            props.size
          )
        }
        onMousemove={(e: any) =>
          handleMouseMoveForDrawLine(e, isDrawing, props.lines, props.setLines)
        }
        onMouseup={() => handleMouseUpForDrawLine(isDrawing)}
      >
        <Layer>
          {props.lines.map((line: any, i: any) => (
            <Line
              key={i}
              points={line.points}
              stroke={String(line.color)}
              strokeWidth={line.size}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
