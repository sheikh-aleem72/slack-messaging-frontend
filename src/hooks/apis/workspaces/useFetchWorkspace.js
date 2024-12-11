import { fetchWorkspaceRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useFetchWorkspace = () => {
  const { auth } = useAuth();

  const token = auth.token.replace(/^"|"$/g, "");
  const {
    isFetching,
    isSuccess,
    error,
    data: workspaces,
  } = useQuery({
    queryFn: () => fetchWorkspaceRequest({ token: token }),
    queryKey: ["fetchWorkspace"],
    staleTime: 5 * 1000 * 60, // 5 minutes
    enabled: !!auth?.token,
  });

  return {
    isFetching,
    isSuccess,
    error,
    workspaces,
  };
};
