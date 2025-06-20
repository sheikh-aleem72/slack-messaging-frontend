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

    // console.log("Repsonse from create workspace api: ", response);

    return response?.data?.data;
  } catch (error) {
    console.log("Error in createWorkspaceRequest", error);
    throw error.response.data;
  }
};

export const fetchWorkspaceRequest = async ({ token }) => {
  try {
    console.log("Reached!!");
    const response = await axios.get("/workspace", {
      headers: {
        "x-access-token": token,
      },
    });

    console.log("API called. response - ", response?.data);
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

    // console.log("Response from fetchWorkspaceById: ", response?.data?.data);

    return response?.data?.data;
  } catch (error) {
    console.log("Error while fetching workspace by id", error);
    throw error.response;
  }
};

export const deleteWorkspaceRequest = async ({ token, workspaceId }) => {
  try {
    const response = await axios.delete(`/workspace/${workspaceId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    // console.log(
    //   "Response from delete workspace api request: ",
    //   response?.data?.data
    // );

    return response?.data?.data;
  } catch (error) {
    console.log("Error while deleting workspace by id", error);
    throw error.response.data;
  }
};

export const updateWorkspaceRequest = async ({ token, name, workspaceId }) => {
  try {
    const response = await axios.put(
      `/workspace/${workspaceId}`,
      { name },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    // console.log(
    //   "Response from update workspace api request: ",
    //   response?.data?.data
    // );

    return response?.data?.data;
  } catch (error) {
    console.log("Error while updating workspace by id", error);
    throw error.response.data;
  }
};

export const createChannelRequest = async ({
  token,
  channelName,
  workspaceId,
}) => {
  try {
    const response = await axios.put(
      `/workspace/${workspaceId}/channels`,
      { channelName },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    // console.log("Response from add channel to workspace: ", response);

    return response?.data?.data;
  } catch (error) {
    console.log("Error while creating channel", error);
    throw error.response.data;
  }
};

export const resestJoinCodeRequest = async ({ token, workspaceId }) => {
  try {
    const response = await axios.put(
      `/workspace/${workspaceId}/joinCode/reset`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    // console.log(
    //   "Response from update joincode api request: ",
    //   response?.data?.data
    // );

    return response?.data?.data;
  } catch (error) {
    console.log("Error while updating joincode", error);
    throw error.response.data;
  }
};

export const joinWorkspaceRequest = async ({
  token,
  workspaceId,
  joinCode,
}) => {
  try {
    const response = await axios.put(
      `/workspace/${workspaceId}/join`,
      { joinCode: joinCode },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    // console.log("Response from join workspace request: ", response?.data?.data);

    return response?.data?.data;
  } catch (error) {
    console.log("Error while joining to workspace:", error);
    throw error.response.data;
  }
};

export const addMemberToWorkspaceUsingMailRequest = async ({
  token,
  workspaceId,
  email,
}) => {
  try {
    const response = await axios.put(
      `/workspace/${workspaceId}/addMembers`,
      { email },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    // console.log(
    //   "Response from add member to workspace using mail request: ",
    //   response?.data?.data
    // );

    return response?.data?.data;
  } catch (error) {
    console.log("Error while adding member to workspace using mail:", error);
    throw error.response.data;
  }
};
