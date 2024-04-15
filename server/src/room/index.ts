import { Socket } from "socket.io";

export const roomHandler = (socket: Socket) => {

  const createRoom = () => console.log("Client as ben ceated the room")
  const joinRoom = () => console.log("Client joined the room")

  socket.on('create-room', createRoom)
  socket.on('join-room', joinRoom)

}