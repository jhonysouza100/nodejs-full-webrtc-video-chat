import { RoomProvider } from "./context/RoomContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Room } from "./pages/Room.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <RoomProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:id" element={<Room />} />
          </Routes>
        </RoomProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
