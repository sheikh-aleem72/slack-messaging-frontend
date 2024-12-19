import { createContext, useState } from "react";

const WorkspaceInvitationContext = createContext();

export const WorkspaceInvitationContextProvider = ({ children }) => {
  const [openInvitationModal, setOpenInvitationModal] = useState(false);

  return (
    <WorkspaceInvitationContext.Provider
      value={{ openInvitationModal, setOpenInvitationModal }}
    >
      {children}
    </WorkspaceInvitationContext.Provider>
  );
};

export default WorkspaceInvitationContext;
