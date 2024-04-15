import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

const JoinButton: React.FC = () => {

  const { ws } = useContext(RoomContext)

  const joinRoom = () => {
    ws.emit("join-room",)
  }
  
  const createRoom = () => {
    ws.emit("create-room",)
  }

  return (
    <>
      <button
        onClick={joinRoom}
        className='bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-rose-600 text-white'
        >Join Room
      </button>
      
      <button
        onClick={createRoom}
        className='bg-cyan-400 py-2 px-8 rounded-lg text-xl hover:bg-cyan-600 text-white'
        >Create Room
      </button>
    </>
  );
}

export default JoinButton ;