import { addMemberToWorkspaceUsingMailRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useAddMemberToWorkspaceUsingMail = () => {
  const { auth } = useAuth();
  const { currentWorkspace } = useCurrentWorkspace();

  const {
    isPending,
    error,
    mutateAsync: addMemberToWorkspaceUsingMailMutation,
  } = useMutation({
    mutationFn: (email) =>
      addMemberToWorkspaceUsingMailRequest({
        token: auth?.token,
        workspaceId: currentWorkspace?._id,
        email,
      }),
    onSuccess: (data) => {
      console.log(
        "Member added to workspace using mail successfully",
        data?.data
      );
    },
    onError: (error) => {
      console.log("Error while adding member to workspace using mail: ", error);
    },
  });

  return {
    isPending,
    error,
    addMemberToWorkspaceUsingMailMutation,
  };
};
