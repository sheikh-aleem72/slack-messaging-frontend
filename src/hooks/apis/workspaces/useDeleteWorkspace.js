import { deleteWorkspaceRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useDeleteWorkspace = (workspaceId) => {
  const { auth } = useAuth();

  const {
    isError,
    isPending,
    isSuccess,
    mutateAsync: deleteWorkspaceMutation,
  } = useMutation({
    mutationFn: () =>
      deleteWorkspaceRequest({
        token: auth?.token,
        workspaceId: workspaceId,
      }),
    onSuccess: (response) => {
      console.log("Workspace deleted successfully: ", response.data);
    },
    onError: (error) => {
      console.log("Failed to delete a workspace: ", error);
    },
  });
  return {
    isError,
    isPending,
    isSuccess,
    deleteWorkspaceMutation,
  };
};
