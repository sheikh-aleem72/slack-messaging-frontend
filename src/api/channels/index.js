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

export const getPaginatedMessages = async ({
  channelId,
  limit,
  page,
  token,
}) => {
  try {
    console.log("Fetching messages");
    const response = await axios.get(`/messages/${channelId}`, {
      params: {
        limit: limit || 20,
        page: page || 0,
      },
      headers: {
        "x-access-token": token,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log("Error in getPaginatedMessagesRequest", error);
  }
};
