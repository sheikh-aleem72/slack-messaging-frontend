import { deleteChannelRequest } from "@/api/channels";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useDeleteChannel = (channelId) => {
  const { auth } = useAuth();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: deleteChannelMutation,
  } = useMutation({
    mutationFn: () => deleteChannelRequest({ token: auth?.token, channelId }),
    onSuccess: (data) => {
      console.log("Channel deleted successfully", data);
    },
    onError: (error) => {
      console.log("Error while deleting channel", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    deleteChannelMutation,
  };
};
