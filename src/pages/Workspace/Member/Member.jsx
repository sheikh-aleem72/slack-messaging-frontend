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
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";

export const Member = () => {
  const { memberId } = useParams();
  const messageContainerListRef = useRef(null);

  const queryClient = useQueryClient();

  const { auth } = useAuth();

  const { currentWorkspace } = useCurrentWorkspace();

  const { socket, joinPrivateChat } = useSocket();

  const [privateChatId, setPrivateChatId] = useState(null);

  const {
    typingUsers,
    privateMessagesList,
    setPrivateMessagesList,
    setTypingUsers,
  } = useChannelMessages();

  const { messages, isSuccess, isFetching, isError } =
    useGetPrivateMessages(memberId);

  // join private chat
  useEffect(() => {
    if (!socket || isFetching || isError) return;

    socket.emit("leavePrivateChat", {
      userId: auth?.user.id,
      otherUserId: memberId,
    });

    socket.emit(
      "joinPrivateChat",
      { userId: auth?.user?.id, otherUserId: memberId },
      (data) => {
        console.log("Successfully joined the private chat", data);
        setPrivateChatId(data.data);
      }
    );

    return () => {
      socket.emit("leavePrivateChat", {
        userId: auth?.user.id,
        otherUserId: memberId,
      });
    };
  }, [socket, isFetching, memberId]);

  // useEffect for showing new message first
  useEffect(() => {
    if (messageContainerListRef.current) {
      setTimeout(() => {
        messageContainerListRef.current.scrollTo({
          top: messageContainerListRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [privateMessagesList, typingUsers]);

  // useEffect for removing cache
  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(["getPrivateMessages", memberId]);
    }
  }, [isSuccess, queryClient, memberId]);

  // Listening to message receving event
  useEffect(() => {
    if (!privateChatId) return; // Ensure privateChatId is set before adding the listener

    const privateMessageListener = (data) => {
      console.log("📩 New Private Message Received:", data);

      if (data.privateChatId === privateChatId) {
        setPrivateMessagesList((prev) => [...prev, data]);
      }
    };

    socket.on("newPrivateMessageReceived", privateMessageListener);

    return () => {
      socket.off("newPrivateMessageReceived", privateMessageListener);
    };
  }, [privateChatId]);

  // useEffect for getting messages
  useEffect(() => {
    if (isSuccess) {
      setPrivateMessagesList(messages);
      console.log("Messages: ", privateMessagesList);
    }
  }, [isSuccess, memberId, messages]);

  if (isFetching) {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slack-darklight rounded-md">
      <div className="px-5 py-2 bg-white/40 rounded-lg border cursor-pointer hover:bg-gray-100">
        {currentWorkspace?.members?.map((member) => {
          if (member?.memberId._id === memberId) {
            return (
              <div
                className="flex items-center gap-3"
                key={member?.memberId._id}
              >
                <div className="bg-white rounded-full">
                  <img src={member?.memberId.avatar} className="w-[40px] p-1" />
                </div>
                <p
                  key={member?.memberId?._id}
                  className="text-lg text-left font-bold"
                >
                  {member?.memberId.username}
                </p>
              </div>
            );
          }
        })}
      </div>
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
              key={`${memberId}-${message._id}`}
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
