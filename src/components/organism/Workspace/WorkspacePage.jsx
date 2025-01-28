import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import { SideBarItem } from "@/components/atoms/SideBarItem/SideBarItem";
import { HashIcon, Menu } from "lucide-react";
import { UserItem } from "@/components/atoms/UserItem/UserItem";
import { WorkspacePanelHeader } from "@/components/molecules/Workspace/WorkspacePanelHeader";
export const WorkspacePage = () => {
  const { currentWorkspace } = useCurrentWorkspace();
  const { setOpenCreateChannelModal } = useCreateChannelModal();

  return (
    <div className="flex flex-col h-full bg-slack-light gap-6 overflow-auto rounded-md m-[.5px]">
      <div className="flex justify-center items-center w-full mt-4">
        <div className="flex flex-col items-center pt-4 relative">
          <div className="flex items-center justify-center text-[5rem] font-bold h-[120px] w-[120px] text-white bg-gray-400 rounded-full font-sans">
            <h1>{currentWorkspace?.name?.charAt(0).toUpperCase()}</h1>
          </div>
          <div>
            <h1 className="text-2xl font-bold mt-4 text-white">
              {currentWorkspace?.name}
            </h1>
          </div>
          <div className="text-white mt-2">
            <p>{currentWorkspace?.description}</p>
          </div>
          <div>
            {currentWorkspace?.createdAt && (
              <p className="text-gray-200">
                <span>Created On: </span>
                {currentWorkspace?.createdAt?.split("T")[0]}
              </p>
            )}
          </div>
          <div>
            <p className="text-gray-200">
              <span>Workspace: </span>
              {currentWorkspace?.members.length}
              <span> Members</span>
            </p>
          </div>
        </div>
        <div className="absolute top-12 right-0">
          <WorkspacePanelHeader workspace={currentWorkspace} Icon={Menu} />
        </div>
      </div>
      <div className="flex px-4 py-2 mt-4 gap-4 w-full h-full flex-col md:flex-row">
        <div className="flex flex-col basis-2/4 w-full border rounded-sm items-start px-4 py-2 overflow-auto">
          <div>
            <p className="font-bold">All Channels</p>
          </div>
          <div>
            {currentWorkspace?.channels.map((channel) => {
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
          </div>
        </div>
        <div className="basis-2/4 border rounded-sm flex flex-col items-start px-4 py-2">
          <div>
            <p className="font-bold">All Members</p>
          </div>
          <div>
            {currentWorkspace?.members?.map((member) => {
              return (
                <UserItem
                  key={member?._id}
                  label={member?.memberId?.username}
                  id={member?._id}
                  image={member?.memberId?.avatar}
                  role={member?.role}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
