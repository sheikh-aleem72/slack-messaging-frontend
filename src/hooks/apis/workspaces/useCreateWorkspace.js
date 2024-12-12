import { createWorkspaceRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useCreateWorkspace = () => {
  const { auth } = useAuth();

  const {
    isPending,
    isError,
    isSuccess,
    mutateAsync: createWorkspaceMutation,
  } = useMutation({
    mutationFn: (data) =>
      createWorkspaceRequest({ ...data, token: auth?.token }),
    onSuccess: (response) => {
      console.log("Workspace created successfully: ", response.data);
    },
    onError: (error) => {
      console.log("Failed to create workspace: ", error);
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    createWorkspaceMutation,
  };
};
