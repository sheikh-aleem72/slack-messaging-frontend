import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useWorkspaceInvitaion } from "@/hooks/context/useWorkspaceInvitation";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

export const WorkspaceInvitaionModal = () => {
  const [copied, setCopied] = useState(false);

  const { currentWorkspace } = useCurrentWorkspace();
  const { openInvitationModal, setOpenInvitationModal } =
    useWorkspaceInvitaion();

  function handleClose() {
    setOpenInvitationModal(false);
  }

  return (
    <Dialog open={openInvitationModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to workspace</DialogTitle>
        </DialogHeader>

        <div className="flex justify-between items-center px-4 py-2 rounded bg-[#c6bcbc] gap-4">
          <Input
            readOnly
            value={currentWorkspace?.joinCode}
            className="bg-transparent"
          />
          <Button
            onClick={() => {
              navigator.clipboard.writeText(currentWorkspace?.joinCode);
              setCopied(true);
            }}
          >
            {copied ? <CopyCheck /> : <Copy />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
