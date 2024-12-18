import { updateWorkspaceRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useUpdateWorkspace = (workspaceId) => {
  const { auth } = useAuth();

  const {
    isError,
    isPending,
    isSuccess,
    mutateAsync: updateWorkspaceMutation,
  } = useMutation({
    mutationFn: (name) =>
      updateWorkspaceRequest({
        token: auth?.token,
        name,
        workspaceId: workspaceId,
      }),
    onSuccess: (response) => {
      console.log("Workspace updated successfully: ", response.data);
    },
    onError: (error) => {
      console.log("Failed to updating a workspace: ", error);
    },
  });
  return {
    isError,
    isPending,
    isSuccess,
    updateWorkspaceMutation,
  };
};
