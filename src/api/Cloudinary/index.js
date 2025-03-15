import axiosConfig from "@/config/axiosConfig";
import axios from "axios";

export const uploadImageToCloudinarypresignedUrl = async (
  URL,
  formData,
  config
) => {
  try {
    const response = await axios.post(URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image to AWS", error);
    throw error;
  }
};

export const getPresignedUrl = async ({ token }) => {
  try {
    const response = await axiosConfig.get("/messages/pre-signed-url", {
      headers: {
        "x-access-token": token,
      },
    });
    return response?.data;
  } catch (error) {
    console.log("Error in getting presigned url", error);
    throw error;
  }
};
