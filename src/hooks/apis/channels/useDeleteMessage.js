import { deleteMessageRequest } from "@/api/channels";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useDeleteMessage = (messageId) => {
  const { auth } = useAuth();

  const {
    isPending,
    isError,
    error,
    mutateAsync: deleteMessageMutation,
  } = useMutation({
    mutationFn: () =>
      deleteMessageRequest({
        token: auth?.token,
        messageId,
      }),
    onSuccess: (data) => {
      console.log("Message deleted successfully", data);
    },
    onError: (error) => {
      console.log("Error while deleting message");
    },
  });

  return {
    isPending,
    isError,
    error,
    deleteMessageMutation,
  };
};
