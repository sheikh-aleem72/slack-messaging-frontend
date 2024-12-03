import { useMutation } from "@tanstack/react-query";
import { signUpRequest } from "@/api/auth";

export const useSignup = () => {
  const {
    isError,
    isSuccess,
    isPending,
    mutateAsync: signupMutation,
  } = useMutation({
    mutationFn: signUpRequest,
    onSuccess: (data) => {
      console.log("Successfully signed up", data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {
    isError,
    isSuccess,
    isPending,
    signupMutation,
  };
};
