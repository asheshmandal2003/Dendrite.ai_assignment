import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("Ready to accept connections!");
  socket.on("join-room", (id) => {
    socket.join(id);
    console.log(`User connected to room ${id}`);
  });
  socket.on("send-changes", (data) => {
    socket.broadcast
      .to(data.docId)
      .emit("show-changes", { id: data.socketId, changes: data.changes });
  });
  socket.on("undo", (data) => {
    socket.broadcast.to(data.roomId).emit("undo-change", { id: data.id });
  });
  socket.on("redo", (data) => {
    socket.broadcast
      .to(data.roomId)
      .emit("redo-change", { id: data.id, changes: data.changes });
  });
});
