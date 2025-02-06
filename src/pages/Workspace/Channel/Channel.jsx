import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { ChannelHeader } from "@/components/molecules/Channel/ChannelHeader";
import { ChatInput } from "@/components/molecules/ChatInput/ChatInput";
import { Message } from "@/components/molecules/Message/Message";
import { useGetChannelById } from "@/hooks/apis/channels/useGetChannelById";
import { useGetChannelMessages } from "@/hooks/apis/channels/useGetChannelMessages";
import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { useSocket } from "@/hooks/context/useSocket";

export const Channel = () => {
  const { channelId } = useParams();

  const queryClient = useQueryClient();

  const { channelDetails, isFetching, isError } = useGetChannelById(channelId);
  const { setMessageList, messageList } = useChannelMessages();

  const { joinChannel } = useSocket();

  const { messages, isSuccess } = useGetChannelMessages(channelId);

  const messageContainerListRef = useRef(null);

  // useEffect for showing new message first
  useEffect(() => {
    if (messageContainerListRef.current) {
      messageContainerListRef.current.scrollTop =
        messageContainerListRef.current.scrollHeight;
    }
  }, [messageList, channelId]);

  // useEffect for removing cache
  useEffect(() => {
    console.log("ChannelId", channelId);
    queryClient.invalidateQueries("getPaginatedMessages");
  }, [channelId]);

  // useEffect for joining channel if channel is switched
  useEffect(() => {
    if (!isFetching && !isError) {
      joinChannel(channelId);
    }
  }, [isFetching, isError, joinChannel, channelId]);

  // useEffect for setting messages fetched from the database to messageList
  useEffect(() => {
    if (isSuccess) {
      console.log("Channel Messages fetched", messages);
      setMessageList(messages);
    }
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
              authorId={message.senderId?._id}
              createdAt={`${date} ${time}`}
              image={message?.image}
              senderId={message?.senderId?._id}
            />
          );
        })}
      </div>

      <div className="flex-1" />
      <ChatInput />
    </div>
  );
};
