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
    onSuccess: (data) => {
      console.log("Successfully signed in", data);
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
