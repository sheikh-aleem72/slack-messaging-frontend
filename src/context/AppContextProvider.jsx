import combineContext from "@/utils/CombineContext";
import { AuthContextProvider } from "./AuthContext";

/**
 * This component will simply combine the context provider using combine context
 */
export const AppContextProvider = combineContext(AuthContextProvider);
