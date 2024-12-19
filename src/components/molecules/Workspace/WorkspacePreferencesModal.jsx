import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteWorkspace } from "@/hooks/apis/workspaces/useDeleteWorkspace";
import { useUpdateWorkspace } from "@/hooks/apis/workspaces/useUpdateWorkspace";
import { UseWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useToast } from "@/hooks/use-toast";
import { useConfirm } from "@/hooks/useConfirm";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const WorkspacePreferencesModal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [workspaceId, setWorkspaceId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const { openPreferences, setOpenPreferences, initialValue, workspace } =
    UseWorkspacePreferencesModal();
  const { confirmation, ConfirmDialog } = useConfirm({
    title: "Do you want to delete this workspace",
    message: "This action is not reversible",
  });
  const { confirmation: updateConfirmation, ConfirmDialog: UpdateDialog } =
    useConfirm({
      title: "Do you want rename the workspace?",
      message: "Your workspace will be renamed!",
    });
  const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);
  const { isPending, updateWorkspaceMutation } =
    useUpdateWorkspace(workspaceId);

  useEffect(() => {
    setWorkspaceId(workspace?._id);
    setRenameValue(workspace?.name);
  }, [workspace]);

  function handleClose() {
    setOpenPreferences(false);
  }

  async function handleDeleteWorkspace() {
    try {
      const ok = await confirmation();
      if (!ok) {
        return;
      }
      const response = await deleteWorkspaceMutation();
      navigate("/home");
      queryClient.invalidateQueries("fetchWorkspace");
      setOpenPreferences(false);
      console.log("Workspace deleted successfully: ", response);
      toast({
        title: "Workspace Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      console.log("Error while deleting workspace", error);
      toast({
        title: "Error in deleting workspace",
        type: "failed",
      });
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const ok = await updateConfirmation();
      if (!ok) {
        return;
      }
      await updateWorkspaceMutation(renameValue);
      queryClient.invalidateQueries(`fetchWorkspaceById-${workspace?._id}`);
      setOpenPreferences(false);
      toast({
        title: "Workspace Updated Successfully",
        type: "success",
      });
    } catch (error) {
      console.log("Error while updating workspace", error);
      toast({
        title: "Error in updating workspace",
        type: "failed",
      });
    }
  }

  return (
    <>
      <ConfirmDialog />
      <UpdateDialog />
      <Dialog open={openPreferences} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{initialValue}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">Workspace Name</p>
                    <p className="text-sm font-semibold hover:underline">
                      Edit
                    </p>
                  </div>

                  <p className="text-sm">{initialValue}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename Workspace</DialogTitle>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <Input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={50}
                    disabled={isPending}
                    placeholder="Workspace Name e.g. Design Team"
                  />

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="float-end"
                  >
                    Save
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <button
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50"
              onClick={handleDeleteWorkspace}
            >
              <TrashIcon className="size-5" />
              <p className="text-sm font-semibold">Delete Workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
