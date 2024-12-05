import { useMutation } from "@tanstack/react-query";
import { signUpRequest } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";

export const useSignup = () => {
  const { toast } = useToast();
  const {
    isError,
    isSuccess,
    isPending,
    mutateAsync: signupMutation,
  } = useMutation({
    mutationFn: signUpRequest,
    onSuccess: (data) => {
      console.log("Successfully signed up", data);
      toast({
        title: "Successfully signed up",
        message: "You will be redirected to sign in page in few moments",
        type: "success",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Failed to sign up",
        message: error.message,
        type: "error",
        variant: "destructive",
      });
    },
  });
  return {
    isError,
    isSuccess,
    isPending,
    signupMutation,
  };
};
