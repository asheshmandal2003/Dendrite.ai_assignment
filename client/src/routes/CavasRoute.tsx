import { Routes, Route } from "react-router-dom";
import { Canvas } from "../pages/Canvas/Canvas";

export const CavasRoute = () => {
  return (
    <Routes>
      <Route path="/whiteboard/:id" element={<Canvas />} />
    </Routes>
  );
};
