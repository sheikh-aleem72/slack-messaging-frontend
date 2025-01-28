import { WorksapceNavbar } from "@/components/organism/Workspace/WorkspaceNavbar";
import { WorkspacePanel } from "@/components/organism/Workspace/WorkspacePanel";
import { WorkspaceSidebar } from "@/components/organism/Workspace/WorkspaceSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const WorkspaceLayout = ({ children }) => {
  return (
    <div className="h-[100vh] px-[.5px]">
      <div>
        <WorksapceNavbar />
      </div>
      <div className="flex h-[calc(100vh-48px)] p-[.5px]">
        <WorkspaceSidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId={"workspace-resize"}
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-slack-medium rounded-r-md"
          >
            <WorkspacePanel />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
