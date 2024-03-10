import { useEffect, useRef, useState } from "react";
import { Sidebar } from "../../components/canvas/Sidebar";
import { CanvasLayout } from "../../components/canvas/CanvasLayout";
import "../../assets/styles/canvas/Canvas.css";
import io, { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";

const INTERVAL = 60000;

export const Canvas = () => {
  const [tool, setTool] = useState<String>(() => "pen");
  const [lines, setLines] = useState<Array<Object>>(() => []);
  const [storeLastElements, setStoreLastElements] = useState<Array<Object>>(
    () => []
  );
  const [size, setSize] = useState<Number>(() => 5);
  const [color, setColor] = useState<String>(() => "#000");
  const [websocket, setWebsocket] = useState<Socket | null>(() => null);
  const [pointer, setPointer] = useState<Object>(() => {
    return { x: 0, y: 0 };
  });
  const [loading, setLoading] = useState(() => true);
  const { id } = useParams();
  const stageRef = useRef<any>(null);

  async function loadDocument() {
    await axios
      .get(`http://localhost:8000/api/v1/whiteboard/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        res.data.data === "" || Object.keys(res.data.data).length === 0
          ? setLines([])
          : setLines(JSON.parse(res.data.data));
        setLoading(false);
      })
      .catch((err) => console.error(err.response));
  }

  async function saveChanges() {
    const data = new FormData();
    data.append("data", JSON.stringify(lines));
    console.log(data);
    await axios
      .put(`http://localhost:8000/api/v1/whiteboard/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((err) => console.error(err.response));
  }

  useEffect(() => {
    const socket = io("ws://localhost:3001", {
      autoConnect: true,
    });
    setWebsocket(socket);

    socket.emit("join-room", id);
    loadDocument();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const len = lines.length;
    const lastElemet = lines[len - 1];

    if (!websocket || len === 0) return;
    websocket.emit("send-changes", {
      socketId: websocket.id,
      docId: id,
      changes: lastElemet,
    });
  }, [websocket, pointer]);

  useEffect(() => {
    if (!websocket) return;

    const showChanges = (data: any | null) => {
      if (!data) return;
      setLines((prevLines) => [...prevLines, data.changes]);
    };
    websocket.on("show-changes", showChanges);
    return () => {
      websocket.off("show-changes", showChanges);
    };
  }, [websocket, lines]);

  useEffect(() => {
    if (!websocket) return;

    const undoChange = (data: any | null) => {
      if (!data) return;
      if (data.id === websocket.id) return;
      setLines((prevLines) => prevLines.slice(0, -1));
    };
    websocket.on("undo-change", undoChange);

    return () => {
      websocket.off("undo-change", undoChange);
    };
  }, [websocket]);

  useEffect(() => {
    if (!websocket) return;

    const redoChange = (data: any | null) => {
      if (!data) return;
      if (data.id === websocket.id) return;
      if (data.changes) {
        console.log(data.changes);
        setLines((prevLines) => [...prevLines, data.changes]);
      }
    };
    websocket.on("redo-change", redoChange);

    return () => {
      websocket.off("redo-change", redoChange);
    };
  }, [websocket]);

  useEffect(() => {
    const interval = setInterval(() => {
      saveChanges();
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [lines]);

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
          webSocket={websocket}
          roomId={Number(id)}
          stageRef={stageRef}
        />
      </div>
      <div className="canvas-container">
        <CanvasLayout
          loading={loading}
          lines={lines}
          setLines={setLines}
          tool={tool}
          color={color}
          size={size}
          pointer={pointer}
          setPointer={setPointer}
          stageRef={stageRef}
        />
      </div>
    </div>
  );
};
