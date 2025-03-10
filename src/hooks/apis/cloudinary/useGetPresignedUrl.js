import { getPresignedUrl } from "@/api/Cloudinary";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetPresignedUrl = () => {
  const { auth } = useAuth();

  const {
    isPending,
    isError,
    error,
    mutateAsync: getPreSignedUrlMutation,
  } = useMutation({
    mutationFn: () => getPresignedUrl({ token: auth?.token }),
    onSuccess: (data) => {
      console.log("Presigned url received!");
    },
    onError: (error) => {
      console.log("Error while fetching presigned url");
    },
  });

  return {
    isPending,
    isError,
    error,
    getPreSignedUrlMutation,
  };
};
