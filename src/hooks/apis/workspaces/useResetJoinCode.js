import {
  resestJoinCodeRequest,
  updateWorkspaceRequest,
} from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useResetJoinCode = (workspaceId) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const {
    isError,
    isPending,
    isSuccess,
    mutateAsync: resetJoinCodeMutation,
  } = useMutation({
    mutationFn: () =>
      resestJoinCodeRequest({
        token: auth?.token,
        workspaceId: workspaceId,
      }),
    onSuccess: (response) => {
      console.log("Join Code reset successfully: ", response.data);
      queryClient.invalidateQueries(`fetchWorkspaceById-${workspaceId}`);
    },
    onError: (error) => {
      console.log("Failed to reseting joincode: ", error);
    },
  });
  return {
    isError,
    isPending,
    isSuccess,
    resetJoinCodeMutation,
  };
};
