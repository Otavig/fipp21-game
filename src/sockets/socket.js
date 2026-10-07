

export default function socketInit(io) {
    io.on('connection', (socket) => {
      console.log(socket);
      socket.on('disconnect', () => {      

      });
  

    });
}
