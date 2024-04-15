import { createContext } from "react";
import io from 'socket.io-client';

// Conexión al servidor de Socket.io
const ws = io('/');

// Se declara un contexto
export const RoomContext = createContext<null  | any>(null);

// Se crea el proveedor del contexto
export const RoomProvider: React.FunctionComponent = ({ children }) => {

  const data = { ws };

  return <RoomContext.Provider value={data}>{children}</RoomContext.Provider>;
};
