import { joinWorkspaceRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useJoinWorkspace = (workspaceId) => {
  const { auth } = useAuth();

  const {
    isError,
    isPending,
    isSuccess,
    mutateAsync: joinWorkspaceMutation,
  } = useMutation({
    mutationFn: (joinCode) =>
      joinWorkspaceRequest({
        token: auth?.token,
        workspaceId: workspaceId,
        joinCode,
      }),
    onSuccess: (response) => {
      console.log(
        "You have been joined in a workspace successfully: ",
        response.data
      );
    },
    onError: (error) => {
      console.log("Failed while joining to a workspace: ", error.message);
    },
  });
  return {
    isError,
    isPending,
    isSuccess,
    joinWorkspaceMutation,
  };
};
