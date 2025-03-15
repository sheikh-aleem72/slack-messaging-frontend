import axios from "@/config/axiosConfig.js";

export const signUpRequest = async ({ email, username, password }) => {
  try {
    const response = await axios.post("/users/signup", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("Error from signUpReqeust", error);
    if (error.code === "ERR_NETWORK") {
      throw error;
    }
    throw error.response.data;
  }
};

export const signInReqeust = async ({ email, username, password }) => {
  try {
    const response = await axios.post("/users/signin", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("Error from signInReqeust", error);
    if (error.code === "ERR_NETWORK") {
      throw error;
    }
    throw error.response.data;
  }
};
