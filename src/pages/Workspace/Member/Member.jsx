import { useQueryClient } from "@tanstack/react-query";
import {
  Loader2Icon,
  MoreHorizontalIcon,
  TriangleAlertIcon,
  TypeIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { ChatInput } from "@/components/molecules/ChatInput/ChatInput";
import { Message } from "@/components/molecules/Message/Message";
import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { useSocket } from "@/hooks/context/useSocket";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/context/useAuth";
import { useGetPrivateMessages } from "@/hooks/apis/privateChat/useGetPrivateMessages";

export const Member = () => {
  const { memberId } = useParams();
  const messageContainerListRef = useRef(null);

  const queryClient = useQueryClient();

  const { auth } = useAuth();

  const { socket, joinPrivateChat, currentPrivateChat } = useSocket();

  const {
    typingUsers,
    privateMessagesList,
    setPrivateMessagesList,
    setTypingUsers,
  } = useChannelMessages();

  const { messages, isSuccess, isFetching } = useGetPrivateMessages(memberId);

  // join private chat
  useEffect(() => {
    socket.emit("leavePrivateChat", { currentPrivateChat });
    joinPrivateChat(auth?.user?.id, memberId);
  }, [
    memberId,
    joinPrivateChat,
    isSuccess,
    privateMessagesList,
    setPrivateMessagesList,
    currentPrivateChat,
  ]);

  // useEffect for showing new message first
  useEffect(() => {
    if (messageContainerListRef.current) {
      messageContainerListRef.current.scrollTo({
        top: messageContainerListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [privateMessagesList, typingUsers]);

  // useEffect for removing cache
  useEffect(() => {
    queryClient.invalidateQueries(["getPrivateMessages", memberId]);
  }, [memberId]);

  // Listening to message receving event
  useEffect(() => {
    const privateMessageListener = (data) => {
      console.log("📩 New Private Message Received:", data);
      setPrivateMessagesList([...privateMessagesList, data]);
    };

    socket.on("newPrivateMessageReceived", privateMessageListener);

    return () => {
      socket.off("newPrivateMessageReceived", privateMessageListener);
    };
  }, []);

  // useEffect for getting messages
  useEffect(() => {
    if (isSuccess) {
      setPrivateMessagesList(messages);
      console.log("Messages: ", privateMessagesList);
    }
  }, [
    isSuccess,
    privateMessagesList,
    setPrivateMessagesList,
    memberId,
    currentPrivateChat,
  ]);

  if (isFetching) {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slack-darklight rounded-md">
      {/* We need to make sure that below div is scrollable for the messages */}
      <div
        ref={messageContainerListRef}
        className="flex-5 overflow-y-auto p-5 gap-y-2"
      >
        {privateMessagesList?.map((message) => {
          const time = new Date(message.createdAt).toLocaleTimeString();
          const date = new Date(message.createdAt).toLocaleDateString();
          return (
            <Message
              key={message._id}
              messageId={message._id}
              body={message.body}
              authorImage={message.senderId?.avatar}
              authorName={message.senderId?.username}
              createdAt={`${date} ${time}`}
              image={message?.image}
              senderId={message?.senderId?._id}
            />
          );
        })}
        {typingUsers?.length > 0 &&
          typingUsers.map((user) => {
            return (
              <div
                key={user?._id}
                className="flex items-center gap-2 self-start px-4"
              >
                <button className="self-start pt-[1px]">
                  <Avatar>
                    <AvatarImage
                      src={user?.avatar}
                      className="rounded-md bg-gray-400"
                    />
                    <AvatarFallback>
                      {user?.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>

                <div className="w-auto flex flex-col overflow-hidden bg-gray-200 p-1.5 px-4 rounded-sm ">
                  <div className="text-xs mb-[1px] text-black/50 flex items-center">
                    <button className="font-bold  hover:underline">
                      {user?.username}
                    </button>
                  </div>
                  <div className="flex items-center space-x-1 p-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-400"></div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="flex-1" />
      <ChatInput />
    </div>
  );
};
