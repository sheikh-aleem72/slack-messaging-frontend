import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/context/useAuth";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { LucideLogOut, LucideSettings2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const UserButton = () => {
  const { auth, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();
  const queryClient = useQueryClient();

  function openWorkspaceCreateModal() {
    setOpenCreateWorkspaceModal(true);
  }

  async function handleLogout() {
    await logout();

    queryClient.invalidateQueries("fetchWorkspace"); // Removes previous workspaces of previous user from cache

    toast({
      title: "Successfully signed out",
      type: "success",
    });

    navigate("/auth/signin");
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none relative">
          <Avatar className="size-10 hover:opacity-65 transition">
            <AvatarImage src={auth?.user?.avatar} />
            <AvatarFallback>{auth?.user?.username}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={openWorkspaceCreateModal}>
            <Pencil className="size-4 mr-2 h-10" />
            Create Workspace
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LucideSettings2 className="size-4 mr-2 h-10" />
            Setting
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LucideLogOut className="size-4 mr-2 h-10" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
