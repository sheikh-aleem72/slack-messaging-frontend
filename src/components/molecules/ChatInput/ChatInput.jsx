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

    let fileUrl = null;
    if (image) {
      /*
      // Logic for image sharing in chat using aws presigned url
      const preSignedUrl = await queryClient.fetchQuery({
        queryKey: ["getPresignedUrl"],
        queryFn: () => getPreginedUrl({ token: auth?.token }),
      });

      console.log("Presigned url", preSignedUrl);

      const responseAws = await uploadImageToAWSpresignedUrl({
        url: preSignedUrl,
        file: image,
      });
      console.log("file upload success", responseAws);
      fileUrl = preSignedUrl.split("?")[0];

      */
    }

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
