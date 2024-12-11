import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "@/hooks/apis/workspaces/useCreateWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateWorkspaceModal = () => {
  const { openCreateWorkspaceModal, setOpenCreateWorkspaceModal } =
    useCreateWorkspaceModal();
  const [workspaceName, setWorkspaceName] = useState("");

  const navigate = useNavigate();

  const { isPending, createWorkspaceMutation } = useCreateWorkspace();

  function handleClose() {
    setOpenCreateWorkspaceModal(false);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const response = await createWorkspaceMutation({ name: workspaceName });
      console.log("Workspace created successfully!", response);
      navigate(`/workspace/${response._id}`);
    } catch (error) {
      console.log("Could not able to create workspace", error);
    } finally {
      setWorkspaceName("");
      setOpenCreateWorkspaceModal(false);
    }
  }
  return (
    <Dialog open={openCreateWorkspaceModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit}>
          <Input
            placeholder="Put a workspace name e.g. MyWorkspace etc..."
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            required
            disabled={isPending}
            minLength={3}
          />

          <div className="flex justify-end mt-5">
            <Button disabled={isPending}>Create Workspace</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
