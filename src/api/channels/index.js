import axios from "../../config/axiosConfig.js";

export const getChannelByIdRequest = async ({ token, channelId }) => {
  try {
    const response = await axios.get(`/channels/${channelId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("Error from getChannelByIdRequest: ", error);
  }
};
