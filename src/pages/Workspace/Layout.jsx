import { WorksapceNavbar } from "@/components/organism/Workspace/WorkspaceNavbar";
import { WorkspacePanel } from "@/components/organism/Workspace/WorkspacePanel";
import { WorkspaceSidebar } from "@/components/organism/Workspace/WorkspaceSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const WorkspaceLayout = ({ children }) => {
  const { workspaceId } = useParams();
  const { isFetching, isSuccess, error, workspace } =
    useGetWorkspaceById(workspaceId);
  return (
    <div className="h-[100vh] px-[.5px]">
      <div>
        <WorksapceNavbar
          isSuccess={isSuccess}
          isFetching={isFetching}
          error={error}
          workspace={workspace}
        />
      </div>
      <div className="flex h-[calc(100vh-48px)] p-[.5px]">
        <WorkspaceSidebar
          isSuccess={isSuccess}
          isFetching={isFetching}
          error={error}
          workspace={workspace}
        />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId={"workspace-resize"}
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-slack-medium rounded-r-md"
          >
            <WorkspacePanel
              isSuccess={isSuccess}
              isFetching={isFetching}
              error={error}
              workspace={workspace}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
