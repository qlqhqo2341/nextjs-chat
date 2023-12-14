const connectionHandler = (io, socket) => {
  console.log("Client connected");
  socket.on("listen_room", (msg) => {
    if (/^[0-9]$/.exec(msg)) {
      const id = Number(msg);
      const roomString = `${id}_room`;
      console.log(`Listen: ${roomString}`);
      socket.on(roomString, (msg) => {
        console.log("message: " + msg);
        io.emit(roomString, msg);
      });
    }
  });
};

module.exports = {
  connectionHandler,
};
