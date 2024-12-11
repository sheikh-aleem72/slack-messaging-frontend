import { fetchWorkspaceByIdRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaceById = (id) => {
  const { auth } = useAuth();

  const token = auth?.token?.replace(/^"|"$/g, "");
  const {
    isFetching,
    isSuccess,
    error,
    data: workspace,
  } = useQuery({
    queryFn: () => fetchWorkspaceByIdRequest({ token: token, workspaceId: id }),
    queryKey: [`fetchWorkspaceById-${id}`],
    staleTime: 10000,
  });

  return {
    isFetching,
    isSuccess,
    error,
    workspace,
  };
};
