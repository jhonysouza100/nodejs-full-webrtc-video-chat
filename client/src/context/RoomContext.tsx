import Peer from "peerjs";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';

// Conexión al servidor de Socket.io
const ws = io('/');

// Se declara un contexto
export const RoomContext = createContext<null  | any>(null);

// Se crea el proveedor del contexto
export const RoomProvider: React.FunctionComponent = ({ children }) => {

  const navigate = useNavigate()

  // states
  const [me, setMe] = useState<Peer>()
  const [stream, setStream] = useState<MediaStream>()

  // functions
  const enterRoom = ({roomId}: { roomId: string}) => {
    
    console.log({roomId})

    navigate(`/room/${roomId}`)
  }

  const getUsers  = (participants: string) => {
    
    console.log(participants)
    
  }

  // effects
  useEffect(() => {
    
    const meId = crypto.randomUUID()

    const peer = new Peer(meId)
    
    setMe(peer)

    try {

      navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
        
        setStream(stream)
        
      })
      
    } catch (error) {
      console.error(error)
    }

    ws.on('room-created', enterRoom)

    ws.on('get-users', getUsers)

  }, [])

  const data = { ws, me };

  return <RoomContext.Provider value={data}>{children}</RoomContext.Provider>;
};
