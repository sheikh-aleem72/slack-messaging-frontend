import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/hooks/context/useAuth";
import { getPaginatedMessages } from "@/api/channels";

export const useGetChannelMessages = (channelId) => {
  const { auth } = useAuth();

  const { isFetched, isError, error, data, isSuccess } = useQuery({
    queryFn: () =>
      getPaginatedMessages({
        channelId,
        limit: 10,
        page: 0,
        token: auth?.token,
      }),
    queryKey: ["getPaginatedMessages", channelId],
  });

  return {
    isFetched,
    isError,
    error,
    messages: data,
    isSuccess,
  };
};
