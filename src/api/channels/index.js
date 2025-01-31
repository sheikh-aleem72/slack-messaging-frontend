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

export const updateChannelRequest = async ({ token, channelId, name }) => {
  try {
    const response = await axios.put(
      `/channels/${channelId}`,
      { name },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.log("Error from updateChannelRequest: ", error);
  }
};

export const deleteChannelRequest = async ({ token, channelId }) => {
  try {
    const response = await axios.delete(`/channels/${channelId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("Error while deleting channel at deleteChannelRequest", error);
  }
};

export const deleteMessageRequest = async ({ token, messageId }) => {
  try {
    const response = await axios.delete(`/messages/${messageId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("Error from deleteMessageRequest: ", error);
  }
};
