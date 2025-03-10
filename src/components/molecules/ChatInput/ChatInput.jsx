import { getPreginedUrl, uploadImageToAWSpresignedUrl } from "@/api/S3";
import { Editor } from "@/components/atoms/Editor/Editor";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useSocket } from "@/hooks/context/useSocket";
import { useParams } from "react-router-dom";

export const ChatInput = () => {
  const { channelId } = useParams();
  const { memberId } = useParams();
  const { auth } = useAuth();
  const { currentWorkspace } = useCurrentWorkspace();
  const { socket, currentChannel } = useSocket();

  async function handleSubmit({ body, image }) {
    console.log(body, image);

    let fileUrl = image;

    // logic for image sharing using cloudinary.
    if (channelId) {
      socket?.emit(
        "NewMessage",
        {
          channelId: currentChannel,
          body,
          image: fileUrl,
          senderId: auth?.user?.id,
          workspaceId: currentWorkspace,
        },
        (data) => {
          console.log("Message Sent", data);
        }
      );
    } else if (memberId) {
      socket?.emit(
        "sendPrivateMessage",
        {
          body,
          image: fileUrl,
          senderId: auth?.user?.id,
          receiverId: memberId,
        },
        (data) => {
          console.log("Private Message Sent", data);
        }
      );
      console.log("Private message sent successfully");
    }
  }

  return (
    <div className="px-5 w-full">
      <Editor
        placeholder="Type a message..."
        onSubmit={handleSubmit}
        onCancel={() => {}}
        disabled={false}
        defaultValue=""
        socket={socket}
      />
    </div>
  );
};
