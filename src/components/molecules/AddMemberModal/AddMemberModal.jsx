import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddMemberToWorkspaceUsingMail } from "@/hooks/apis/workspaces/useAddMemberToWorkspaceUsingMail";
import { useAddMemberModal } from "@/hooks/context/useAddMemberModal";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const AddMemberModal = () => {
  const [email, setEmail] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const { openAddMemberModal, setOpenAddMemberModal } = useAddMemberModal();

  const { currentWorkspace } = useCurrentWorkspace();

  const { error: mutationError, addMemberToWorkspaceUsingMailMutation } =
    useAddMemberToWorkspaceUsingMail();

  function handleClose() {
    setOpenAddMemberModal(false);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const isEmailValid = emailRegex.test(email);
      if (!isEmailValid) {
        toast({
          title: "Invalid email address",
          type: "failed",
        });
        return;
      }
      await addMemberToWorkspaceUsingMailMutation(email);
      queryClient.invalidateQueries(
        `fetchWorkspaceById-${currentWorkspace?._id}`
      );
      setEmail("");
      setOpenAddMemberModal(false);
      toast({
        title: "Member Added Successfully",
        type: "success",
      });
    } catch (error) {
      console.log("Error while adding member", error);
      toast({
        title: error.message,
        type: "failed",
      });
    }
  }
  return (
    <>
      <Dialog open={openAddMemberModal} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Member To Workspace</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleFormSubmit}>
            <Input
              placeholder="Enter email of user"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <Button type="submit">Add Member</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
