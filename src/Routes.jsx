import { Route, Routes } from "react-router-dom";
import SignupContainer from "./components/organism/auth/SignupContainer";
import { Auth } from "./pages/Auth/Auth";
import { SigninContainer } from "./components/organism/auth/SigninContainer";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/molecules/ProtectedRoute/ProtectedRoute";

export const AppRoutes = () => {
  return (
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
          <ProtectedRoute>
            <Auth>
              <h1>home</h1>
            </Auth>
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
