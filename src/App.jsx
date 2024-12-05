import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "@/pages/Auth/Auth";
import { SignupCard } from "@/components/organism/auth/SignupCard";
import { SigninCard } from "@/components/organism/auth/SigninCard";
import NotFound from "@/pages/NotFound/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignupContainer from "./components/organism/auth/signupContainer";

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
                <SigninCard />
              </Auth>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
