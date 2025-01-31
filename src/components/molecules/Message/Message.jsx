import { MessageImageThumbnail } from "@/components/atoms/MessageImageThumbnail/MessageImageThumbnail";
import { MessageRenderer } from "@/components/atoms/MessageRenderer/MessageRenderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/context/useAuth";

export const Message = ({
  authorImage,
  authorName,
  createdAt,
  body,
  image,
  senderId,
}) => {
  const { auth } = useAuth();
  const isCurrentUser = auth?.user.id === senderId;
  return (
    <div className="flex flex-col gap-2  mb-2 px-5 text-white  group relative">
      {isCurrentUser ? (
        <div className="flex items-center gap-2 self-end">
          <div className="w-full flex flex-col overflow-hidden bg-gray-400 p-1.5 px-5 rounded-sm">
            <div className="text-xs mb-[1px] text-black/50">
              <button className="font-bold  hover:underline">You</button>
              <span>&nbsp;&nbsp;</span>
              <button className="text-xs hover:underline">{createdAt}</button>
            </div>

            <MessageRenderer value={body} />
            {image && <MessageImageThumbnail url={image} />}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 self-start">
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

          <div className="w-full flex flex-col overflow-hidden bg-gray-200 p-1.5 px-5 rounded-sm ">
            <div className="text-xs mb-[1px] text-black/50">
              <button className="font-bold  hover:underline">
                {authorName}
              </button>
              <span>&nbsp;&nbsp;</span>
              <button className="text-xs hover:underline">{createdAt}</button>
            </div>

            <MessageRenderer value={body} />
            {image && <MessageImageThumbnail url={image} />}
          </div>
        </div>
      )}
    </div>
  );
};
