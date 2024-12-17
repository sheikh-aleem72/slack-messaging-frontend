import { WorksapceNavbar } from "@/components/organism/Workspace/WorkspaceNavbar";
import { WorkspaceSidebar } from "@/components/organism/Workspace/WorkspaceSidebar";

export const WorkspaceLayout = ({ children }) => {
  return (
    <div className="h-[100vh]">
      <div>
        <WorksapceNavbar />
      </div>
      <div className="flex h-[calc(100vh-40px)]">
        <WorkspaceSidebar />
        {children}
      </div>
    </div>
  );
};
