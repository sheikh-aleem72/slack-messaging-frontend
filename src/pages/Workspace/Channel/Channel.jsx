import { ChannelHeader } from "@/components/molecules/Channel/ChannelHeader";
import { ChatInput } from "@/components/molecules/ChatInput/ChatInput";
import { Message } from "@/components/molecules/Message/Message";
import { useGetChannelById } from "@/hooks/apis/channels/useGetChannelById";
import { useGetChannelMessages } from "@/hooks/apis/channels/useGetChannelMessages";
import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { useSocket } from "@/hooks/context/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, TriangleAlertIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Channel = () => {
  const { channelId } = useParams();

  const queryClient = useQueryClient();

  const { isFetching, isError, channelData } = useGetChannelById(channelId);

  const { joinChannel } = useSocket();

  const { isSuccess, messages } = useGetChannelMessages(channelId);

  const { messageList, setMessageList } = useChannelMessages();

  // useEffect for invalidating cache for messages
  useEffect(() => {
    console.log("channel id: ", channelId);
    queryClient.invalidateQueries("getPaginatedMessages");
  }, [channelId]);

  // useEffect for joining channel when channel changes
  useEffect(() => {
    if (!isFetching && !isError) {
      joinChannel(channelId);
    }
  }, [isFetching, isError, channelData]);

  // useEffect for setting message  list
  useEffect(() => {
    if (isSuccess) {
      console.log("Channel messages fetched");
      setMessageList(messages);
    }
  }, [isSuccess, setMessageList, messages, channelId]);

  if (isFetching) {
    return (
      <div className="h-full flex-1 flex flex-col justify-center items-center">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 h-full flex flex-col justify-center items-center">
        <TriangleAlertIcon className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Channel not found</span>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col">
      <ChannelHeader name={channelData?.name} />
      <div className="h-auto overflow-scroll">
        {messageList?.map((message) => {
          return (
            <Message
              key={message._id}
              body={message.body}
              authorImage={message.senderId?.avatar}
              authorName={message.senderId?.username}
              createdAt={message.createdAt}
            />
          );
        })}
      </div>
      <div className="flex-1" />
      <ChatInput />
    </div>
  );
};
