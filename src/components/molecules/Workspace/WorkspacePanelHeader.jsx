import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/context/useAuth";
import { UseWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, ListFilterIcon, SquarePenIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { WorkspaceInvitationModal } from "./WorkspaceInvitationModal";

export const WorkspacePanelHeader = ({ workspace }) => {
  const { setOpenPreferences, setInitialValue } =
    UseWorkspacePreferencesModal();

  const [openInviteModal, setOpenInviteModal] = useState(false);

  const workspacemembers = workspace?.members;

  const { auth } = useAuth();

  const { setWorkspace } = UseWorkspacePreferencesModal();

  const isLoggedInUserAdminOfWorkspace = workspacemembers?.find(
    (member) =>
      member.memberId._id === auth?.user?.id && member.role === "admin"
  );

  useEffect(() => {
    setWorkspace(workspace);
  }, []);

  return (
    <>
      <WorkspaceInvitationModal
        openInviteModal={openInviteModal}
        setOpenInviteModal={setOpenInviteModal}
        workspaceName={workspace?.name}
        joinCode={workspace?.joinCode}
      />

      <div className="flex items-center justify-between px-4 h-[50px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="transparent"
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
            >
              <span className="truncate">{workspace?.name}</span>
              <ChevronDownIcon className="size-5 ml-1" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="bottom"
            align="start"
            className="w-64 bg-white rounded-md p-2"
          >
            <DropdownMenuItem>
              <div className="size-9 relative overflow-hidden text-white font-semibold text-xl rounded-md flex items-center justify-center bg-[#616061] ml-2">
                <span className="">
                  {workspace?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col items-start px-2">
                <p className="font-bold">{workspace?.name}</p>
                <p className="text-xs text-muted-foreground">
                  Active Workspace
                </p>
              </div>
            </DropdownMenuItem>

            {isLoggedInUserAdminOfWorkspace && (
              <>
                <DropdownMenuItem
                  className="cursor-pointer p-2"
                  onClick={() => {
                    setInitialValue(workspace?.name);
                    setOpenPreferences(true);
                  }}
                >
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer p-2"
                  onClick={() => setOpenInviteModal(true)}
                >
                  Invite people to {workspace?.name}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <Button variant="transparent" size="iconSm">
            <ListFilterIcon className="size-5" />
          </Button>

          <Button variant="transparent" size="iconSm">
            <SquarePenIcon className="size-5" />
          </Button>
        </div>
      </div>
    </>
  );
};
