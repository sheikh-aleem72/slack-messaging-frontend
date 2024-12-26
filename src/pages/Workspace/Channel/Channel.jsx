import { useGetChannelById } from "@/hooks/apis/channels/useGetChannelById";
import { Loader2, TriangleAlertIcon } from "lucide-react";
import { useParams } from "react-router-dom";

export const Channel = () => {
  const { channelId } = useParams();

  const { isFetching, isError, channelData } = useGetChannelById(channelId);

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
  return <div>Channel {channelData?.name}</div>;
};
