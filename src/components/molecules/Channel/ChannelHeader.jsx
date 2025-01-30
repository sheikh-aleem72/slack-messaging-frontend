import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateChannel } from "@/hooks/apis/channels/useUpdateChannel";
import { useToast } from "@/hooks/use-toast";
import { useConfirm } from "@/hooks/useConfirm";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useParams } from "react-router-dom";

export const ChannelHeader = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const { channelId } = useParams();
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const { confirmation, ConfirmDialog } = useConfirm({
    title: "Do you want to delete this workspace",
    message: "This action is not reversible",
  });
  const { confirmation: updateConfirmation, ConfirmDialog: UpdateDialog } =
    useConfirm({
      title: "Do you want rename the channel?",
      message: "Your channel will be renamed!",
    });
  const { updateChannelMutation } = useUpdateChannel(channelId);

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const ok = await updateConfirmation();
      if (!ok) return;

      await updateChannelMutation(renameValue);
      queryClient.invalidateQueries("get-channel-" + channelId);
      setIsOpen(false);
      toast({
        title: "Channel renamed successfully",
        type: "success",
      });
    } catch (error) {
      console.log("Error while updating channel at handleFormSubmit", error);
      toast({
        title: "Error while renaming channel",
        type: "error",
      });
    }
  }
  return (
    <>
      <ConfirmDialog />
      <UpdateDialog />
      <div className="bg-slack-darklight rounded-t-md border-b h-[50px] flex items-center px-4 py-4 overflow-hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-lg font-semibold px-2 w-auto overflow-hidden"
            >
              <span># {name} </span>
              <FaChevronDown className="size-3 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle># {name}</DialogTitle>
            </DialogHeader>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger>
                <div className="px-4 pb-4 flex flex-col gap-y-2">
                  <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Channel name</p>
                      <p className="text-sm font-semibold">Edit</p>
                    </div>
                    <p className="text-sm">{name}</p>
                  </div>

                  {/* HW implement edit dialog for editting name of a channel */}
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename Channel</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <Input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={50}
                    // disabled={isPending}
                    placeholder="Channel Name e.g. dev-team"
                  />

                  <Button
                    type="submit"
                    // disabled={isPending}
                    className="float-end"
                  >
                    Save
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
