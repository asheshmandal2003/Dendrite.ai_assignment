import { handleRedo, handleUndo } from "../../utils/UndoAndRedo";
import { SidebarProps } from "../../types/canvas/SidebarProps";
import { useState } from "react";
import { Button } from "../ui/Button";

const colors = [
  {
    id: 1,
    color: "#fff",
  },
  {
    id: 2,
    color: "#000",
  },
  {
    id: 3,
    color: "#FF0000",
  },
  {
    id: 4,
    color: "#7CFC00",
  },
  {
    id: 5,
    color: "#0096FF",
  },
];

const options = [
  {
    id: 1,
    name: "Brush",
    value: "pen",
    img: "/images/brush.svg",
  },
  {
    id: 2,
    name: "Erase",
    value: "eraser",
    img: "/images/erase.svg",
  },
];

export const Sidebar = (props: SidebarProps) => {
  const [selected, setSelected] = useState(() => "pen");
  const [rangeValue, setRangeValue] = useState(() => 2);
  return (
    <>
      <p className="mb-3">Options</p>
      {options.map((option) => (
        <div
          key={option.id}
          className={`d-flex gap-3 text-${
            selected === option.value ? "primary" : "secondary"
          } mt-1`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.setTool(option.value);
            setSelected(option.value);
          }}
        >
          <img src={option.img} height={24} width={24} alt={option.value} />
          <p>{option.name}</p>
        </div>
      ))}
      <input
        type="range"
        className="form-range mb-3"
        min="1"
        max="50"
        value={rangeValue}
        onChange={(e) => {
          setRangeValue(Number(e.target.value));
          props.setSize(rangeValue);
        }}
      />
      <Button
        variant="btn-outline-secondary"
        icon="/images/undo.svg"
        btnText="Undo"
        onClick={() =>
          handleUndo(props.lines, props.setLines, props.setStoreLastElements)
        }
      />
      <Button
        variant="btn-outline-secondary"
        icon="/images/redo.svg"
        btnText="Redo"
        onClick={() =>
          handleRedo(
            props.setLines,
            props.storeLastElements,
            props.setStoreLastElements
          )
        }
        className="mt-3"
      />
      <p className="my-3">Colors</p>
      <div className="d-flex flex-wrap justify-content-between ">
        {colors.map((color) => (
          <div
            key={color.id}
            className="d-flex justify-content-center align-items-center"
            style={{
              width: 25,
              height: 25,
              borderRadius: "50%",
              backgroundColor:
                props.color === color.color ? color.color : "#f1f1f1",
            }}
          >
            <div
              onClick={() => props.setColor(color.color)}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: color.color,
                cursor: "pointer",
                border: "2px solid #f1f1f1",
              }}
            />
          </div>
        ))}
      </div>
      <Button
        variant="btn-primary"
        icon="/images/download.svg"
        btnText="Download"
        className="mt-4"
      />
    </>
  );
};
