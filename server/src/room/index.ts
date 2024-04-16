import { Socket } from "socket.io";
import { Room } from "../interfaces/room.interface";

const roomId = crypto.randomUUID()

const rooms: Record<string, string[]> = {}

export const roomHandler = (socket: Socket) => {

  const createRoom = () => {

    rooms[roomId] = []
    
    socket.emit('room-created', { roomId })
    
    console.log("Client ceated the room")
  }
  
  const joinRoom = ({roomId, peerId}: Room) => {

    if(rooms[roomId]) {
      
      rooms[roomId].push(peerId); // lista de participantes en la room
  
      socket.join(roomId)
  
      socket.emit('get-users', {
        roomId,
        participants: rooms[roomId]
      })
      
      console.log("Client joined the room:", roomId, "\nPeerId:",peerId)
      
    }

    socket.on('disconnect', () => {

      console.log("User left the room", peerId)

      leaveRoom({roomId, peerId})

    })
    
  }

  const leaveRoom = ({peerId, roomId}: Room) => {

    rooms[roomId] = rooms[roomId].filter( id => id !== peerId)

    socket.to(roomId).emit('user-disconnectd', peerId)

  }

  socket.on('create-room', createRoom)

  socket.on('join-room', joinRoom)

}