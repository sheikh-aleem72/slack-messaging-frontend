import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import { useState } from "react";

export const CreateChannelModal = () => {
  const { openCreateChannelModal, setOpenCreateChannelModal } =
    useCreateChannelModal();

  const [channelName, setChannelName] = useState("");

  function handleClose() {
    setOpenCreateChannelModal(false);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
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
