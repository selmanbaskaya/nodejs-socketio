const express = require("express");
const socket = require("socket.io");

/* const fs = require("fs");
const axios = require("axios");
const iot = require("./src/scripts/IoTStreamer");
const constant = require("./src/constant/Constant"); */

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
    /* axios
      .post(data.url, data.body)
      .then((res) => { */
        /* const iotValues = iot.extractResponseValueByKey(res.data, data.valuePath);
        const newLine = "\r\n" + iotValues[data["xLabel"]][0] + ", " + iotValues[data["yLabel"]][0];
        const csvFilePath = constant.PYTHON_TASK_DIR + data["userId"] + "/twinapi/" + data["fileName"]

        if (!fs.existsSync(csvFilePath)) {
          fs.writeFileSync(csvFilePath, "time,value");
        }
        fs.appendFileSync(csvFilePath, newLine); */

        if (false) {
          io.sockets.emit("response", { warningMsg: "IoT streaming has been reached its the limit value!" });
        } else {
          io.sockets.emit("response", { responseData: res.data });
        }
      /* })
      .catch((error) => {
        console.error(error);
      }); */
  });
});
