import { createWorkspaceRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useCreateWorkspace = () => {
  const { auth } = useAuth();

  const token = auth?.token?.replace(/^"|"$/g, ""); // resolve this issue

  const {
    isPending,
    isError,
    isSuccess,
    mutateAsync: createWorkspaceMutation,
  } = useMutation({
    mutationFn: (data) => createWorkspaceRequest({ ...data, token: token }),
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
