import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "@/pages/Auth/Auth";
import NotFound from "@/pages/NotFound/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignupContainer from "./components/organism/auth/signupContainer";
import { SigninContainer } from "./components/organism/auth/SigninContainer";
import { Toaster } from "./components/ui/toaster";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/auth/signup"
            element={
              <Auth>
                <SignupContainer />
              </Auth>
            }
          />
          <Route
            path="/auth/signin"
            element={
              <Auth>
                <SigninContainer />
              </Auth>
            }
          />
          <Route
            path="/home"
            element={
              <Auth>
                <h1>home</h1>
              </Auth>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
