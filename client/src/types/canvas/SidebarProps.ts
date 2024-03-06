import { Dispatch, SetStateAction } from "react";

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
};
