const connectionHandler = (io, socket) => {
  console.log("Client connected");
  socket.on("listen_room", (msg) => {
    const id = msg;
    const roomString = `${id}_room`;
    console.log(`Listen: ${roomString}`);
    socket.on(roomString, (msg) => {
      console.log("message: " + msg);
      io.emit(roomString, msg);
    });
  });
};

module.exports = {
  connectionHandler,
};
