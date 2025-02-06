import { useAuth } from "@/hooks/context/useAuth";
import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socket = io(import.meta.env.VITE_SOCKET_BACKEND_URL, {
  autoConnect: false,
});

export const SocketContextProvider = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const { auth } = useAuth();
  const { messageList, setMessageList } = useChannelMessages();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    if (auth?.user) {
      socket.connect();
      console.log("✅ Socket Connected");

      socket.emit("userConnected", auth?.user.id); // Emiting the userConnected event

      socket.on("activeUsers", (users) => {
        setActiveUsers(users); // update active user list
      });

      return () => {
        socket.disconnect();
        console.log("Socket Disconnected");
      };
    }
  }, [auth]); // runs only when user logs in or logout

  const messageListener = (data) => {
    console.log("📩 New Message Received:", data);
    setMessageList([...messageList, data]);
  };

  socket.on("NewMessageReceived", messageListener);

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
        activeUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
