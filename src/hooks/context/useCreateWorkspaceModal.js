import createWorkspaceContext from "@/context/CreateWorkspaceContext";
import { useContext } from "react";

export const useCreateWorkspaceModal = () => {
  return useContext(createWorkspaceContext);
};
