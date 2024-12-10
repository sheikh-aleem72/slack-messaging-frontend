import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/context/useAuth";
import { LucideLogOut, LucideSettings2 } from "lucide-react";

export const UserButton = () => {
  const { auth } = useAuth();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none relative">
          <Avatar className="size-10 hover:opacity-65 transition">
            <AvatarImage src={auth?.user?.avatar} />
            <AvatarFallback>
              {auth?.user?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <LucideSettings2 className="size-4 mr-2 h-10" />
            Setting
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LucideLogOut className="size-4 mr-2 h-10" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
