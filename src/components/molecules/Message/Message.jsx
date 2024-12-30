import { MessageRenderer } from "@/components/atoms/MessageRenderer/MessageRenderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Message = ({ authorImage, authorName, createdAt, body }) => {
  return (
    <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
      <div className="flex items-center gap-2">
        <button>
          <Avatar>
            <AvatarImage src={authorImage} className="rounded-md" />
            <AvatarFallback>
              {authorName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>

        <div className="w-full flex flex-col overflow-hidden">
          <div className="text-xs">
            <button className="font-bold text-primary hover:underline">
              {authorName}
            </button>
            <span>&nbsp;&nbsp;</span>
            <button className="text-xs text-muted-foreground hover:underline">
              {createdAt}
            </button>
          </div>

          <MessageRenderer value={body} />
        </div>
      </div>
    </div>
  );
};