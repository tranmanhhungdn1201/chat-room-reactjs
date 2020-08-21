import { toast } from 'react-toastify';
import io from "socket.io-client";
import { getToken } from './auth';

export const setupSocket = () => {
    const token = getToken();
    if (token) {
      const newSocket = io(process.env.REACT_APP_URL, {
        query: {
          token: token,
        },
      });

      newSocket.on("disconnect", () => {
          setTimeout(setupSocket, 3000);
          toast.error("Socket Disconnected!");
          return null;
      });

      newSocket.on("connect", () => {
        toast.success("Socket Connected!");
      });
      console.log(newSocket);
      return newSocket;
    }
};