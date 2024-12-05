import React, { useEffect, useState } from "react";
import { SignupCard } from "./SignupCard";
import { useSignup } from "@/hooks/apis/auth/useSignUp";
import { useNavigate } from "react-router-dom";

export default function SignupContainer() {
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState(null);

  const navigate = useNavigate();

  const { isPending, isSuccess, error, signupMutation } = useSignup();

  async function onSignupFormSubmit(e) {
    e.preventDefault();
    console.log("Singup form submitted successfully", signupForm);
    if (
      !signupForm.username ||
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword
    ) {
      console.log("All fields are required");
      setValidationError({ message: "All field are required" });
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      console.log("Password do not match");
      setValidationError({ message: "Password do not match" });
      return;
    }

    setValidationError(null);

    await signupMutation({
      email: signupForm.email,
      username: signupForm.username,
      password: signupForm.password,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/auth/signin");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <SignupCard
        isPending={isPending}
        isSuccess={isSuccess}
        error={error}
        signupForm={signupForm}
        setSignupForm={setSignupForm}
        onSignupFormSubmit={onSignupFormSubmit}
        validationError={validationError}
      />
    </>
  );
}
