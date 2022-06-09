const net = require("net");
const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("./src"));

const tcp = new net.Socket();
tcp.connect(8002, "localhost");
tcp.on("connect", () => console.log("conectado"));

const server = app.listen(8001, () => {
  console.log("server listening on port 8001");
});

const io = socket(server);
io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    tcp.write(data);
  });
});

// server.listen({ port: 8002, host: "localhost", writableAll: true }, () => {
//   console.log(
//     `listening on ${server.address().address}:${server.address().port}`
//   );
// });
// server.on("connection", (socket) => {
//   console.log("cheguei aqui");
// });

// server.on("teste", (ev) => {
//   console.log(ev);
// });
