import axiosConfig from "@/config/axiosConfig";
import axios from "axios";

export const uploadImageToAWSpresignedUrl = async (URL, file) => {
  try {
    const response = await axios.put(URL, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    console.log("Response from Amazon S3", response);
    return response;
  } catch (error) {
    console.error("Error uploading image to AWS", error);
  }
};

export const getPreginedUrl = async ({ token }) => {
  try {
    const response = await axiosConfig.get("/messages/pre-signed-url", {
      headers: {
        "x-access-token": token,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log("Error in getting presigned url", error);
  }
};
