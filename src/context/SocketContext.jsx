import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { createContext, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const { messageList, setMessageList } = useChannelMessages();

  const socket = io(import.meta.env.VITE_SOCKET_BACKEND_URL);

  socket.on("NewMessageReceived", (data) => {
    console.log("new message Received: ", data);
    setMessageList([...messageList, data]);
  });

  async function joinChannel(channelId) {
    socket.emit("JoinChannel", { channelId }, (data) => {
      console.log("Successfully joined the channel", data);
      setCurrentChannel(data?.data);
    });
  }
  return (
    <SocketContext.Provider
      value={{
        socket,
        joinChannel,
        currentChannel,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
