import { createContext, useState } from "react";

const createWorkspaceContext = createContext();

export const CreateWorkspaceContextProvider = ({ children }) => {
  const [openCreateWorkspaceModal, setOpenCreateWorkspaceModal] =
    useState(false);

  return (
    <createWorkspaceContext.Provider
      value={{ openCreateWorkspaceModal, setOpenCreateWorkspaceModal }}
    >
      {children}
    </createWorkspaceContext.Provider>
  );
};

export default createWorkspaceContext;
