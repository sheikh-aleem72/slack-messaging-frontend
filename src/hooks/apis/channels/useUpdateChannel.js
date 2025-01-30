import { updateChannelRequest } from "@/api/channels";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useUpdateChannel = (channelId) => {
  const { auth } = useAuth();

  const {
    isError,
    isPending,
    error,
    mutateAsync: updateChannelMutation,
  } = useMutation({
    mutationFn: (name) =>
      updateChannelRequest({ token: auth?.token, channelId, name }),
    onSuccess: (data) => {
      console.log("Channel updated successfully", data);
    },
    onError: (error) => {
      console.log("Error while updating channel", error);
    },
  });

  return { isError, isPending, error, updateChannelMutation };
};
