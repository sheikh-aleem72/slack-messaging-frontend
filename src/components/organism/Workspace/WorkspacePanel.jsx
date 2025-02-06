import { SideBarItem } from "@/components/atoms/SideBarItem/SideBarItem";
import { UserItem } from "@/components/atoms/UserItem/UserItem";
import { WorkspacePanelHeader } from "@/components/molecules/Workspace/WorkspacePanelHeader";
import { WorkspacePanelSection } from "@/components/molecules/Workspace/WorkspacePanelSection";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import { useAddMemberModal } from "@/hooks/context/useAddMemberModal";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import {
  AlertTriangleIcon,
  ChevronDownIcon,
  HashIcon,
  Loader,
} from "lucide-react";
import { useParams } from "react-router-dom";

export const WorkspacePanel = () => {
  const { workspaceId } = useParams();

  const { workspace, isFetching, isSuccess } = useGetWorkspaceById(workspaceId);

  const { setOpenCreateChannelModal } = useCreateChannelModal();
  const { setOpenAddMemberModal } = useAddMemberModal();

  if (isFetching) {
    return (
      <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
        <Loader className="animate-spin size-6 text-white" />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
        <AlertTriangleIcon className="size-6 text-white" />
        Something went wrong
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full bg-slack-medium">
      <WorkspacePanelHeader
        workspace={workspace}
        Icon={ChevronDownIcon}
        trigger={workspace?.name}
      />
      <WorkspacePanelSection
        label={"Channels"}
        onIconClick={() => setOpenCreateChannelModal(true)}
      >
        {workspace &&
          workspace?.channels.map((channel) => {
            return (
              <SideBarItem
                key={channel?._id}
                label={channel?.name}
                icon={HashIcon}
                id={channel?._id}
                variant="default"
              />
            );
          })}
      </WorkspacePanelSection>

      <WorkspacePanelSection
        label="Direct messages"
        onIconClick={() => {
          console.log("Add Member button clicked!");
          setOpenAddMemberModal(true);
        }}
      >
        {workspace?.members?.map((member) => {
          return (
            <UserItem
              key={member?._id}
              label={member?.memberId?.username}
              id={member?._id}
              image={member?.memberId?.avatar}
              memberId={member?.memberId._id}
            />
          );
        })}
      </WorkspacePanelSection>
    </div>
  );
};
