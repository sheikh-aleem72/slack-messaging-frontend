import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AppContextProvider } from "@/context/AppContextProvider";
import { AppRoutes } from "@/Routes";
import { Modals } from "./components/organism/Modals/Modals";
import CustomErrorBoundary from "./components/molecules/CustomErrorBoundary/CustomErrorBoundary";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CustomErrorBoundary>
          <AppContextProvider>
            <AppRoutes />
            <Modals />
          </AppContextProvider>
        </CustomErrorBoundary>
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
