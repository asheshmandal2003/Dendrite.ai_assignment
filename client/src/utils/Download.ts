import { Stage } from "konva/lib/Stage";
import { MutableRefObject } from "react";

export const download = (stageRef: MutableRefObject<Stage>) => {
  const stage = stageRef.current;
  const dataURL = stage.toDataURL({ pixelRatio: 2 });

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `img-${Date.now()}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
