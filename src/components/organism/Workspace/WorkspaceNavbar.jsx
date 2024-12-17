import { Button } from "@/components/ui/button";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import { InfoIcon, LucideLoader2, SearchIcon } from "lucide-react";
import { useParams } from "react-router-dom";

export const WorksapceNavbar = () => {
  const { workspaceId } = useParams();
  const { workspace, isFetching } = useGetWorkspaceById(workspaceId);

  if (isFetching) {
    return <LucideLoader2 className="animate-spin ml-2" />;
  }
  return (
    <nav className="h-10 flex items-center justify-center bg-slack-dark p-1.5">
      <div className="flex-1" />
      <div>
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent/15 w-full justify-start h-7 px-2"
        >
          <SearchIcon className="size-5 text-white mr-2" />
          <span className="text-white text-xs">
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
