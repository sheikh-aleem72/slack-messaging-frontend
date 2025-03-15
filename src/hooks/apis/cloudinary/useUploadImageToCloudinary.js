import { uploadImageToCloudinarypresignedUrl } from "@/api/Cloudinary";
import { useMutation } from "@tanstack/react-query";

export const useUploadImageToCloudinary = () => {
  const { mutateAsync: uploadImageToCloudinarypresignedUrlMutation } =
    useMutation({
      mutationFn: (data) =>
        uploadImageToCloudinarypresignedUrl(
          data.URL,
          data.formData,
          data.config
        ),
      onSuccess: (data) => {
        console.log("Image uploaded successfully");
      },
      onError: (error) => {
        console.log("Error while uploading image", error);
      },
    });

  return { uploadImageToCloudinarypresignedUrlMutation };
};
