import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateChannel } from "@/hooks/apis/workspaces/useCreateChannel";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateChannelModal = () => {
  const [channelName, setChannelName] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { openCreateChannelModal, setOpenCreateChannelModal } =
    useCreateChannelModal();
  const { currentWorkspace } = useCurrentWorkspace();
  const { createChannelMutation } = useCreateChannel();

  function handleClose() {
    setOpenCreateChannelModal(false);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const response = await createChannelMutation(channelName);
      queryClient.invalidateQueries(
        `fetchWorkspaceById-${currentWorkspace?._id}`
      );
      setOpenCreateChannelModal(false);
      toast({
        title: "Channel created successfully",
        type: "success",
      });
    } catch (error) {
      console.log("Error while creating channel");
      setOpenCreateChannelModal(false);
      toast({
        title: "Error while creating channel",
        type: "failed",
      });
    }
  }

  return (
    <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Channel</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit}>
          <Input
            placeholder="Channel Name e.g. team-annoucement"
            required
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <Button type="submit">Create Channel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
