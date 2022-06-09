const { json } = require("body-parser");
var express = require("express");
var net = require("net");
var socket = require("socket.io");

const app = express();
const mensagens = [];

app.use(express.static("./src/page"));

const server = app.listen(8000, () => {
  console.log("server listening on port 8000");
});

const io = socket(server);

io.on("connection", (socket) => {
  socket.emit("hello", "world");

  const connection = net.createServer((skt) => {
    skt.on("data", (data) =>
      socket.emit("messageReceived", Buffer.from(data).toString())
    );
  });

  connection.listen({ port: 8002, hostname: "localhost" }, () => {
    console.log(`socket listen on ${connection.address().port}`);
  });
});
