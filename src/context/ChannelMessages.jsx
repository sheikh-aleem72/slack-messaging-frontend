import { createContext, useState } from "react";

const ChannelMessages = createContext();

export const ChannelMessagesProvider = ({ children }) => {
  const [messageList, setMessageList] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [privateMessagesList, setPrivateMessagesList] = useState([]);

  return (
    <ChannelMessages.Provider
      value={{
        messageList,
        setMessageList,
        typingUsers,
        setTypingUsers,
        privateMessagesList,
        setPrivateMessagesList,
      }}
    >
      {children}
    </ChannelMessages.Provider>
  );
};

export default ChannelMessages;
