const http = require("http");
const server = http.createServer();
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(message);
    socket.broadcast.emit("new-message", message);
  });
  console.log("New client connected with socket id :", socket.id);
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
