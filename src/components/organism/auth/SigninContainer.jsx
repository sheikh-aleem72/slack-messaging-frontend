import { useSignIn } from "@/hooks/apis/auth/useSignIn";
import { useEffect, useState } from "react";
import { SigninCard } from "./SigninCard";
import { useNavigate } from "react-router-dom";

export const SigninContainer = () => {
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [validationError, setValidationError] = useState(null);

  const { isPending, isSuccess, error, signinMutation } = useSignIn();

  async function onSigninFormSubmit(e) {
    e.preventDefault();
    // console.log("Signed in form submitted successfully", signinForm);

    if (!signinForm.email || !signinForm.password) {
      console.log("All fields are required");
      setValidationError({ message: "All fields are required" });
      return;
    }

    setValidationError(null);

    await signinMutation({
      email: signinForm.email,
      password: signinForm.password,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <SigninCard
        isPending={isPending}
        isSuccess={isSuccess}
        error={error}
        signinForm={signinForm}
        setSigninForm={setSigninForm}
        validationError={validationError}
        onSigninFormSubmit={onSigninFormSubmit}
      />
    </>
  );
};
