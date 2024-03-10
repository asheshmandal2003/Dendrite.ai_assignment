import { useRef } from "react";
import { Circle, Layer, Line, Stage } from "react-konva";
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
      {!props.loading ? (
        <Stage
          ref={props.stageRef}
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
            handleMouseMoveForDrawLine(
              e,
              isDrawing,
              props.lines,
              props.setLines,
              props.setPointer
            )
          }
          onMouseup={() => handleMouseUpForDrawLine(isDrawing)}
        >
          <Layer listening={false}>
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
            <Circle
              x={props.pointer.x}
              y={props.pointer.y}
              radius={5}
              fill={String(props.color)}
            />
          </Layer>
        </Stage>
      ) : (
        <div
          className="stage"
          style={{
            height: 460,
            width: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: 30, fontWeight: 600, color: "#555" }}>
            Loading...
          </p>
        </div>
      )}
    </div>
  );
}
