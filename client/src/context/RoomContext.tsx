import Peer from "peerjs";
import { createContext, useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { peersReducer } from "./peerReducer";
import { addPeerAction, removePeerAction } from "./peerActions";

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

  // reducers
  const [peers, dispatch] = useReducer(peersReducer, {})

  // functions
  const enterRoom = ({roomId}: { roomId: string}) => {
    
    console.log({roomId})

    navigate(`/room/${roomId}`)
  }

  const getUsers  = (participants: string) => console.log(participants)

  const removePeer = (peerId: string) => dispatch(removePeerAction(peerId))

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

    ws.on('user-user-disconected' , removePeer)

  }, [])

  useEffect(() => {

    if(!me) return
    if(!stream) return

    ws.on('user-joined', (peerId) => {
      const call = me.call(peerId, stream)

      call.on('stream', (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream))
      })
    })
    
    me.on('call', (call) => { 
      call.answer(stream)
      
      call.on('stream', (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream))
      })
    })


  }, [me, stream])

  console.log({peers})

  const data = { ws, me, stream, peers };

  return <RoomContext.Provider value={data}>{children}</RoomContext.Provider>;
};
