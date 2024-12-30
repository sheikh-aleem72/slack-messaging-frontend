import { Editor } from "@/components/atoms/Editor/Editor";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useSocket } from "@/hooks/context/useSocket";

export const ChatInput = () => {
  const { auth } = useAuth();
  const { currentWorkspace } = useCurrentWorkspace();
  const { socket, currentChannel } = useSocket();

  async function handleSubmit({ body }) {
    console.log(body);

    socket?.emit(
      "NewMessage",
      {
        channelId: currentChannel,
        body,
        senderId: auth?.user?.id,
        workspaceId: currentWorkspace,
      },
      (data) => {
        console.log("Message Sent", data);
      }
    );
  }

  return (
    <div className="px-5 w-full">
      <Editor
        placeholder="Type a message..."
        onSubmit={handleSubmit}
        onCancel={() => {}}
        disabled={false}
        defaultValue=""
      />
    </div>
  );
};
