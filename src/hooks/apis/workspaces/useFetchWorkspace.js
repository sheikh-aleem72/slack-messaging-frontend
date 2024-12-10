import { fetchWorkspaceRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useFetchWorkspace = () => {
  const { auth } = useAuth();

  const {
    isFetching,
    isSuccess,
    error,
    data: workspaces,
  } = useQuery({
    queryFn: () => fetchWorkspaceRequest({ token: auth?.token }),
    queryKey: ["fetchWorkspace"],
    staleTime: 30000,
  });

  return {
    isFetching,
    isSuccess,
    error,
    workspaces,
  };
};
