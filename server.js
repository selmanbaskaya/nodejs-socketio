const express = require("express");
const socket = require("socket.io");

const constant = require("./src/constant/Constant");
const iot = require("./src/scripts/IoTStreamer");
const axios = require("axios");
const fs = require("fs");

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

  socket.on("iotData", async (data) => {
    await axios
    .post(data.url, data.body)
    .then((res) => {
        console.log('RESPONSE: ', res.data);
        const iotValues = iot.extractResponseValueByKey(res.data, data.valuePath);
        const newLine = "\r\n" + iotValues[data["xLabel"]][0] + ", " + iotValues[data["yLabel"]][0];
        console.log('New Csv File Line: ', newLine);
        /* const csvFilePath = constant.PYTHON_TASK_DIR + data["userId"] + "/twinapi/" + data["fileName"]
        if (!fs.existsSync(csvFilePath)) {
          fs.writeFileSync(csvFilePath, "time,value");
        }
        fs.appendFileSync(csvFilePath, newLine); */
    })
    .catch((error) => {
      console.error(error);
    });
    console.log("PYTHON_TASK_DIR: ", constant.PYTHON_TASK_DIR);
    console.log("IoT's data: ", data);

    io.sockets.emit("response", { warningMsg: "IoT streaming has been reached its the limit value!" });
  });
});
