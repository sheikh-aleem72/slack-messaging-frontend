import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/hooks/context/useAuth";
import { getPrivateMessages } from "@/api/privateChat";
import { useSocket } from "@/hooks/context/useSocket";

export const useGetPrivateMessages = (memberId) => {
  const { auth } = useAuth();

  const { isError, error, data, isSuccess, isFetching } = useQuery({
    queryFn: () =>
      getPrivateMessages({
        memberId,
        limit: 10,
        page: 0,
        token: auth?.token,
      }),
    queryKey: ["getPrivateMessages", memberId],
    enabled: !!memberId,
  });

  return {
    isFetching,
    isError,
    error,
    messages: data,
    isSuccess,
  };
};
