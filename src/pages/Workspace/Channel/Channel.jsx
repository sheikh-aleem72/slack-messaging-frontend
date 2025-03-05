import { useQueryClient } from "@tanstack/react-query";
import {
  Loader2Icon,
  MoreHorizontalIcon,
  TriangleAlertIcon,
  TypeIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { ChannelHeader } from "@/components/molecules/Channel/ChannelHeader";
import { ChatInput } from "@/components/molecules/ChatInput/ChatInput";
import { Message } from "@/components/molecules/Message/Message";
import { useGetChannelById } from "@/hooks/apis/channels/useGetChannelById";
import { useGetChannelMessages } from "@/hooks/apis/channels/useGetChannelMessages";
import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { useSocket } from "@/hooks/context/useSocket";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Channel = () => {
  const { channelId } = useParams();

  const queryClient = useQueryClient();

  const { channelDetails, isFetching, isError } = useGetChannelById(channelId);
  const { setMessageList, messageList, typingUsers, setTypingUsers } =
    useChannelMessages();

  const { joinChannel, socket } = useSocket();

  const { messages, isSuccess } = useGetChannelMessages(channelId);

  const messageContainerListRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    const handleUserTyping = ({ user, channelId: channelIdSentByServer }) => {
      if (channelIdSentByServer !== channelId) return; // Ignore events from other channels

      setTypingUsers((prev = []) => {
        const isUserAlreadyTyping = prev?.some((u) => u._id === user._id);
        if (isUserAlreadyTyping) return prev;
        return [...prev, user];
      });
    };

    const handleUserStoppedTyping = ({
      user,
      channelId: channelIdSentByServer,
    }) => {
      if (channelIdSentByServer !== channelId) return; // Ignore events from other channels

      setTypingUsers((prev) => prev?.filter((u) => u._id !== user._id));
    };

    socket.on("userTyping", handleUserTyping);

    socket.on("userStoppedTyping", handleUserStoppedTyping);

    return () => {
      socket.off("userTyping", handleUserTyping);
      socket.off("userStoppedTyping", handleUserStoppedTyping);
      setTimeout(() => setTypingUsers([]), 100); // Slight delay to avoid flicker // Reset typing users when switching channels
    };
  }, [socket, channelId]);

  // useEffect for showing new message first
  useEffect(() => {
    if (messageContainerListRef.current) {
      messageContainerListRef.current.scrollTo({
        top: messageContainerListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messageList, typingUsers]);

  // useEffect for removing cache
  useEffect(() => {
    console.log("ChannelId", channelId);
    queryClient.invalidateQueries(["getPaginatedMessages", channelId]);
  }, [channelId]);

  // useEffect for joining channel if channel is switched
  useEffect(() => {
    if (!socket) return; // Ensure socket is available
    if (isFetching || isError) return; // Wait for data to be fetched

    console.log("Joining channel:", channelId);

    socket.emit("LeaveChannel", { channelId }); // Leave previous channel
    joinChannel(channelId); // Join the new channel

    return () => {
      console.log("Leaving channel:", channelId);
      socket.emit("LeaveChannel", { channelId }); // Leave when unmounting
    };
  }, [socket, channelId, isFetching, isError]); // Keep necessary dependencies

  // useEffect for setting messages fetched from the database to messageList
  useEffect(() => {
    if (isSuccess) {
      console.log("Channel Messages fetched", messages);
      setMessageList(messages);
    }

    setTypingUsers((prev) => prev?.filter((u) => u._id !== auth?.user.id));
  }, [isSuccess, messages, setMessageList, channelId]);

  if (isFetching) {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
        <TriangleAlertIcon className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Channel Not found</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slack-darklight rounded-md">
      <ChannelHeader name={channelDetails?.name} />

      {/* We need to make sure that below div is scrollable for the messages */}
      <div
        ref={messageContainerListRef}
        className="flex-5 overflow-y-auto p-5 gap-y-2"
      >
        {messageList?.map((message) => {
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
      <ChatInput channelId={channelId} />
    </div>
  );
};
