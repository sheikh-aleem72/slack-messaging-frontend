import axios from "@/config/axiosConfig";

export const createWorkspaceRequest = async ({ name, descripton, token }) => {
  try {
    const response = await axios.post(
      "/workspace",
      { name, descripton },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    console.log("Repsonse from create workspace api: ", response);

    return response?.data?.data;
  } catch (error) {
    console.log("Error in createWorkspaceRequest", error);
    throw error.response.data;
  }
};

export const fetchWorkspaceRequest = async ({ token }) => {
  try {
    const response = await axios.get("/workspace", {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("Error in fetchWorkspaceRequest", error);
    throw error.response.data;
  }
};

export const fetchWorkspaceByIdRequest = async ({ token, workspaceId }) => {
  try {
    const response = await axios.get(`/workspace/${workspaceId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    console.log("Response from fetchWorkspaceById: ", response?.data?.data);

    return response?.data?.data;
  } catch (error) {
    console.log("Error while fetching workspace by id", error);
    throw error.response.data;
  }
};
