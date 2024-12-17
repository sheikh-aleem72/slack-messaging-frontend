import { WorksapceNavbar } from "@/components/organism/Workspace/WorkspaceNavbar";
import { WorkspaceSidebar } from "@/components/organism/Workspace/WorkspaceSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const WorkspaceLayout = ({ children }) => {
  return (
    <div className="h-[100vh]">
      <div>
        <WorksapceNavbar />
      </div>
      <div className="flex h-[calc(100vh-40px)]">
        <WorkspaceSidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId={"workspace-resize"}
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-slack-medium"
          >
            Sidebar
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
