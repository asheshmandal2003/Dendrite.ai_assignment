import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Ready to accept connections!");
  socket.on("send-changes", (drawing) => {
    io.emit("show-changes", drawing);
  });
});