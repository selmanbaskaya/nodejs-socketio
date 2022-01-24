## Node Express Server for Socket.io
### A Node-Express server to test your Socket.io connections!

****

## Usage

```
<script>
    // connection and send user informations with emitting
    const socket = io("https://nodejs-socketioo.herokuapp.com");
    socket.on("connect", function () {
      const userInfo = { name: "selman", surname: "baskaya", age: "23" };
      socket.emit("userInfo", userInfo);
    });
    // catch the server emit
    socket.on("userInfoResponse", (response) => {
      console.log("Server's message: ", response);
    });
</script>
```
