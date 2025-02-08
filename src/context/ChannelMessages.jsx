import { createContext, useState } from "react";

const ChannelMessages = createContext();

export const ChannelMessagesProvider = ({ children }) => {
  const [messageList, setMessageList] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  return (
    <ChannelMessages.Provider
      value={{ messageList, setMessageList, typingUsers, setTypingUsers }}
    >
      {children}
    </ChannelMessages.Provider>
  );
};

export default ChannelMessages;
