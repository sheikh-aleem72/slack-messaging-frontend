import combineContext from "@/utils/CombineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContext";
import { WorkspacePreferencesModalContextProvider } from "./WorkspacePreferencesModalContext";
import { CreateChannelContextProvider } from "./CreateChannelContext";

/**
 * This component will simply combine the context provider using combine context
 */
export const AppContextProvider = combineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalContextProvider,
  CreateChannelContextProvider
);
