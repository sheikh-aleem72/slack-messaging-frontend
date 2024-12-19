import WorkspaceInvitationContext from "@/context/WorkspaceInvitationContext";
import { useContext } from "react";

export const useWorkspaceInvitaion = () => {
  return useContext(WorkspaceInvitationContext);
};
