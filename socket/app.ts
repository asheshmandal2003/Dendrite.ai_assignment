import express from "express";
import drawingRouter from "./routes/drawing";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/api/v1/whiteboard", drawingRouter);
app.all("*", (_req, res) => {
  res.status(404).json("Invalid API!");
});

app.listen(PORT, () => console.log(`Backend server is listening on ${PORT}`));
