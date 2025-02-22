import axios from "../../config/axiosConfig.js";

export const getPrivateMessages = async ({ memberId, limit, page, token }) => {
  try {
    console.log("Fetching messages");
    const response = await axios.get(`/messages/privateMessages/${memberId}`, {
      params: {
        limit: limit || 20,
        page: page || 0,
      },
      headers: {
        "x-access-token": token,
      },
    });
    console.log("Fetched private messages: ", response?.data?.data);
    return response?.data?.data;
  } catch (error) {
    console.log("Error in get private message request", error);
  }
};
