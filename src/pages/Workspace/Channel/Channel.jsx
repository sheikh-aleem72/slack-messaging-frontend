import { ChannelHeader } from "@/components/molecules/Channel/ChannelHeader";
import { ChatInput } from "@/components/molecules/ChatInput/ChatInput";
import { useGetChannelById } from "@/hooks/apis/channels/useGetChannelById";
import { useSocket } from "@/hooks/context/useSocket";
import { Loader2, TriangleAlertIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Channel = () => {
  const { channelId } = useParams();

  const { isFetching, isError, channelData } = useGetChannelById(channelId);

  const { socket, joinChannel } = useSocket();

  useEffect(() => {
    if (!isFetching && !isError) {
      joinChannel(channelId);
    }
  }, [isFetching, isError, channelData]);

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
      <div className="flex-1" />
      <ChatInput />
    </div>
  );
};
