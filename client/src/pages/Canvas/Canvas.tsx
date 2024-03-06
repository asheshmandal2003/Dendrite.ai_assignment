import { useEffect, useState } from "react";
import { Sidebar } from "../../components/canvas/Sidebar";
import { CanvasLayout } from "../../components/canvas/CanvasLayout";
import "../../assets/styles/canvas/Canvas.css";
import { Socket, io } from "socket.io-client";

const INTERVAL = 3000;

export const Canvas = () => {
  const [tool, setTool] = useState<String>(() => "pen");
  const [lines, setLines] = useState<Array<Object>>(() => []);
  const [storeLastElements, setStoreLastElements] = useState<Array<Object>>(
    () => []
  );
  const [size, setSize] = useState<Number>(() => 5);
  const [color, setColor] = useState<String>(() => "#000");
  const [websocket, setWebsocket] = useState<Socket | undefined>(
    () => undefined
  );

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.connect();
    setWebsocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!websocket) return;
    const interval = setInterval(() => {
      websocket.emit("send-changes", lines);
    }, INTERVAL);
    return () => clearInterval(interval);
  }, [websocket, lines]);

  useEffect(() => {
    if (!websocket) return;
    const showChanges = (drawing: Object[]) => {
      setLines((prevLines) => {
        return [...prevLines, ...drawing];
      });
    };
    websocket.on("show-changes", showChanges);
    return () => {
      websocket.off("show-changes", showChanges);
    };
  }, [websocket]);

  return (
    <div className="outer-container">
      <div className="sidebar-container p-3">
        <Sidebar
          tool={tool}
          color={color}
          setColor={setColor}
          setLines={setLines}
          setTool={setTool}
          setStoreLastElements={setStoreLastElements}
          storeLastElements={storeLastElements}
          lines={lines}
          setSize={setSize}
        />
      </div>
      <div className="canvas-container">
        <CanvasLayout
          lines={lines}
          setLines={setLines}
          tool={tool}
          color={color}
          size={size}
        />
      </div>
    </div>
  );
};
