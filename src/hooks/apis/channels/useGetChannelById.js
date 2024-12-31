import { getChannelByIdRequest } from "@/api/channels";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useGetChannelById = (channelId) => {
  const { auth } = useAuth();

  const {
    isFetching,
    error,
    data: channelDetails,
    isError,
  } = useQuery({
    queryFn: () => getChannelByIdRequest({ token: auth.token, channelId }),
    queryKey: [`get-channel-${channelId}`],
  });

  return {
    isFetching,
    error,
    channelDetails,
    isError,
  };
};
