const express = require("express");
const socket = require("socket.io");

const constant = require("./src/constant/Constant");

const app = express();
const server = app.listen(process.env.PORT || 5100);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("userInfo", (data) => {
    console.log("User's info: ", data);

    const response = { message: `User (${data.name}) has been added!` };
    io.sockets.emit("userInfoResponse", response);
  });

  socket.on("iotData", (data) => {
    console.log("PYTHON_TASK_DIR: ", constant.PYTHON_TASK_DIR);
    console.log("IoT's data: ", data);

    io.sockets.emit("response", { warningMsg: "IoT streaming has been reached its the limit value!" });
  });
});
