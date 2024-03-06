import { Dispatch, SetStateAction } from "react";

export const handleUndo = (
  lines: Array<Object>,
  setLines: Dispatch<SetStateAction<Array<Object>>>,
  setStoreLastElements: Dispatch<SetStateAction<Array<Object>>>
) => {
  const length = lines.length;
  if (length === 0) return;
  setStoreLastElements((prevElements) => [...prevElements, lines[length - 1]]);
  setLines((prevLines) => prevLines.slice(0, -1));
};

export const handleRedo = (
  setLines: Dispatch<SetStateAction<Array<Object>>>,
  storeLastElements: Array<Object>,
  setStoreLastElements: Dispatch<SetStateAction<Array<Object>>>
) => {
  const length = storeLastElements.length;
  if (length === 0) return;
  setLines((prevLines) => [...prevLines, storeLastElements[length - 1]]);
  setStoreLastElements((prevElements) => {
    return prevElements.slice(0, -1);
  });
};
