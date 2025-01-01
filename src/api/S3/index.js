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
