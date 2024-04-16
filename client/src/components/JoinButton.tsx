import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

const JoinButton: React.FC = () => {

  const { ws } = useContext(RoomContext)
  
  const createRoom = () => {

    ws.emit("create-room",)
    
  }

  return (
    <>
      <button
        onClick={createRoom}
        className='bg-cyan-400 py-2 px-8 rounded-lg text-xl hover:bg-cyan-600 text-white'
        >Create Room
      </button>
    </>
  );
}

export default JoinButton ;