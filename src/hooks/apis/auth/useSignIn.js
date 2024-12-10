import { signInReqeust } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = () => {
  const { toast } = useToast();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signinMutation,
  } = useMutation({
    mutationFn: signInReqeust,
    onSuccess: (response) => {
      console.log("Successfully signed in", response);

      const userObject = JSON.stringify(response.data);
      const token = JSON.stringify(response.data.token);

      localStorage.setItem("user", userObject);
      localStorage.setItem("token", token);
      toast({
        title: "Successfully signed in",
        message: "You will be redirected to home page in a few moments",
        type: "success",
      });
    },
    onError: (error) => {
      console.log("Failed to signed in", error);
      toast({
        title: "Failed to signed in",
        message: error.message,
        type: "error",
        variant: "destructive",
      });
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    signinMutation,
  };
};
