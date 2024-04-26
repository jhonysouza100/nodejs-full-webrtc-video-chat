import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { RoomContext } from "../context/RoomContext"
import { VideoPlayer } from "../components/VideoPlayer"
import { PeerState } from "../context/peerReducer"
import { ShareScreenButton } from "../components/ShareScreenButton"

export const Room = () => {

  const {id} = useParams()
  const {ws, me, stream, peers, shareScreen} = useContext(RoomContext)

  useEffect(() => {

    if(me) ws.emit('join-room', {roomId: id, peerId: me._id})

  }, [id])
   
  return (
    <>
      Room id { id }

      <div className="grid grid-cols-4 gap-4">
        {
          Object.values(peers as PeerState).map( (peer) => (
            <VideoPlayer stream={peer.stream} />
          ))
        }
      </div>

      <div className="fixed bottom-0 p-6 w-full flex justify-center border-t-2">
        <ShareScreenButton onClick={shareScreen} />
      </div>

    </>
  )
}