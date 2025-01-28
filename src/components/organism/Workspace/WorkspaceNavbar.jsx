import { Button } from "@/components/ui/button";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { InfoIcon, LucideLoader2, SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const WorksapceNavbar = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { workspace, isFetching, isSuccess, error } =
    useGetWorkspaceById(workspaceId);
  const { setCurrentWorkspace } = useCurrentWorkspace();

  useEffect(() => {
    if (!isFetching && !isSuccess && error) {
      console.log("Error fetching workspace", error);
      if (error.status === 403) {
        logout();
        navigate("/auth/signin");
      }
    }

    if (workspace) {
      setCurrentWorkspace(workspace);
    }
  }, [workspace, setCurrentWorkspace, isFetching, isSuccess, error]);

  if (isFetching) {
    return <LucideLoader2 className="animate-spin ml-2" />;
  }
  return (
    <nav className="h-12 flex items-center justify-center rounded-sm  bg-slack-dark p-1.5">
      <div className="flex-1" />
      <div>
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent/15 min-w-[200px] justify-center h-7 px-2"
        >
          <SearchIcon className="size-5 text-white mr-2" />
          <span className="text-white text-sm ">
            Search {workspace?.name || "Workspace"}
          </span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <InfoIcon className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
