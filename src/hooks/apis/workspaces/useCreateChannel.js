import { createChannelRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { UseWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useCreateChannel = () => {
  const { auth } = useAuth();

  const { workspace } = UseWorkspacePreferencesModal();

  const {
    isPending,
    isSuccess,
    isError,
    mutateAsync: createChannelMutation,
  } = useMutation({
    mutationFn: (channelName) =>
      createChannelRequest({
        token: auth?.token,
        workspaceId: workspace?._id,
        channelName,
      }),
    onSuccess: (data) => {
      console.log("Channel created successfully", data?.data);
    },
    onError: (error) => {
      console.log("Error while creating channel", error);
    },
  });

  return {
    isPending,
    isSuccess,
    isError,
    createChannelMutation,
  };
};
