import combineContext from "@/utils/CombineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContext";
import { WorkspacePreferencesModalContextProvider } from "./WorkspacePreferencesModalContext";
import { CreateChannelContextProvider } from "./CreateChannelContext";
import { WorkspaceContextProvider } from "./WorkspaceContext";
import { SocketContextProvider } from "./SocketContext";
import { ChannelMessagesProvider } from "./ChannelMessages";
import { AddMemberContextProvider } from "./AddMemberContext";

/**
 * This component will simply combine the context provider using combine context
 */
export const AppContextProvider = combineContext(
  WorkspaceContextProvider,
  ChannelMessagesProvider,
  SocketContextProvider,
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalContextProvider,
  CreateChannelContextProvider,
  AddMemberContextProvider
);
