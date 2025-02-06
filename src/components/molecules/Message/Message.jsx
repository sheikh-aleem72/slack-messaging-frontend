import { MessageImageThumbnail } from "@/components/atoms/MessageImageThumbnail/MessageImageThumbnail";
import { MessageRenderer } from "@/components/atoms/MessageRenderer/MessageRenderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMessage } from "@/hooks/apis/channels/useDeleteMessage";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { MoreVertical, Trash } from "lucide-react";

export const Message = ({
  authorImage,
  authorName,
  authorId,
  createdAt,
  body,
  image,
  senderId,
  messageId,
}) => {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const { currentWorkspace } = useCurrentWorkspace();
  const isAdmin = currentWorkspace?.members.find(
    (member) =>
      member.memberId._id === auth?.user?.id && member.role === "admin"
  );
  const isCurrentUser = auth?.user.id === senderId;

  const { deleteMessageMutation } = useDeleteMessage(messageId);

  const { toast } = useToast();

  async function handleDeleteMessage() {
    try {
      await deleteMessageMutation();
      queryClient.invalidateQueries("getPaginatedMessages");
      toast({
        title: "Message Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      console.log("Error while deleting message: ", error);
      toast({
        title: error?.message,
        type: "failed",
      });
    }
  }
  return (
    <div className="flex flex-col gap-2  mb-2 px-5 text-white  group ">
      {isCurrentUser ? (
        <div className="flex items-center gap-2 self-end ">
          <div className="w-full flex flex-col overflow-hidden bg-gray-400 p-1.5 px-4 rounded-sm ">
            <div className="flex text-xs mb-[1px] text-black/50 items-center">
              <button className="font-bold  hover:underline">You</button>
              <span>&nbsp;&nbsp;</span>
              <button className="text-xs hover:underline">{createdAt}</button>
              <button className="hover:bg-gray-500 ml-2 p-1 rounded-full">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <button
                        className="flex items-center gap-2"
                        onClick={handleDeleteMessage}
                      >
                        <Trash /> <span>Delete Message</span>
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </button>
            </div>

            <MessageRenderer value={body} />
            {image && <MessageImageThumbnail url={image} />}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 self-start ">
          <button className="self-start pt-[1px]">
            <Avatar>
              <AvatarImage
                src={authorImage}
                className="rounded-md bg-gray-400"
              />
              <AvatarFallback>
                {authorName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </button>

          <div className="w-full flex flex-col overflow-hidden bg-gray-200 p-1.5 px-4 rounded-sm ">
            <div className="text-xs mb-[1px] text-black/50 flex items-center">
              <button className="font-bold  hover:underline">
                {authorName}
              </button>
              <span>&nbsp;&nbsp;</span>
              <button className="text-xs hover:underline">{createdAt}</button>
              {isAdmin && (
                <button
                  className="hover:bg-gray-500 ml-2 p-1 rounded-full"
                  onClick={handleDeleteMessage}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <button className="flex items-center gap-2">
                          <Trash /> <span>Delete Message</span>
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </button>
              )}
            </div>

            <MessageRenderer value={body} />
            {image && <MessageImageThumbnail url={image} />}
          </div>
        </div>
      )}
    </div>
  );
};
