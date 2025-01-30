import { Hint } from "@/components/atoms/Hint/Hint";
import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { LogOutIcon, Send, UserX } from "lucide-react";
import { MdAdminPanelSettings } from "react-icons/md";
import { useParams } from "react-router-dom";

export const Member = () => {
  const { currentWorkspace } = useCurrentWorkspace();
  const { memberId } = useParams();
  const { auth } = useAuth();

  // fetching user's detail from workspace
  const member = currentWorkspace?.members.find(
    (member) => member?._id === memberId
  );

  // fetching admin details from workspace
  const admin = currentWorkspace?.members.find(
    (member) => member?.role === "admin"
  );

  // Checking if current user is admin
  const isCurrentUserAdmin = auth?.user.id === admin?.memberId._id;

  // Fetching current user
  const currentUser = auth?.user.id === member?.memberId._id;

  return (
    <div className="w-full flex flex-col p-2 bg-slack-darklight h-full rounded-md">
      <div className="flex flex-col  items-center gap-4 mt-4 p-4 relative">
        <div className="h-[300px] w-[300px] rounded-full bg-gray-400">
          <img
            src={member?.memberId?.avatar}
            alt="Member"
            className="h-full w-full  repeat-0 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="flex gap-2 items-center justify-center">
            <h1 className="text-2xl font-bold">{member?.memberId?.username}</h1>
            {member?.role === "admin" && (
              <Hint label="Admin" side={"left"} align={"center"}>
                <MdAdminPanelSettings className="size-5 text-white" />
              </Hint>
            )}
          </div>
          <p className="text-sm">{member?.memberId?.email}</p>
          {isCurrentUserAdmin && member?.role === "member" && (
            <div>
              <button className="flex items-center gap-2 bg-white p-2 mt-2 rounded-md text-black hover:bg-gray-200 hover:text-black outline-none min-w-[170px]">
                <MdAdminPanelSettings className="size-6" />
                <span>Make Admin</span>
              </button>

              <button className="flex items-center gap-2 bg-white p-2 mt-2 rounded-md text-black hover:bg-gray-200 hover:text-black outline-none min-w-[170px]">
                <UserX />
                <span>Remove Member</span>
              </button>
            </div>
          )}

          {!currentUser && (
            <button className="flex items-center gap-2 bg-white p-2 m-2 rounded-md text-black hover:bg-gray-200 hover:text-black outline-none min-w-[170px]">
              <Send />
              <span>Send Message</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
