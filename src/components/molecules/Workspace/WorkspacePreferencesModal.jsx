import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteWorkspace } from "@/hooks/apis/workspaces/useDeleteWorkspace";
import { UseWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const WorkspacePreferencesModal = () => {
  const { openPreferences, setOpenPreferences, initialValue, workspace } =
    UseWorkspacePreferencesModal();
  const navigate = useNavigate();
  const [workspaceId, setWorkspaceId] = useState(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);

  function handleClose() {
    setOpenPreferences(false);
  }

  async function handleDeleteWorkspace() {
    try {
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

  useEffect(() => {
    setWorkspaceId(workspace?._id);
  }, [workspace]);

  return (
    <Dialog open={openPreferences} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialValue}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">Workspace Name</p>
              <p className="text-sm font-semibold hover:underline">Edit</p>
            </div>
            <p className="text-sm">{initialValue}</p>
          </div>

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
  );
};
