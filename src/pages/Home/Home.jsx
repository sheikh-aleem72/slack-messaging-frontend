import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isFetching, workspaces } = useFetchWorkspace();
  const navigate = useNavigate();
  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

  useEffect(() => {
    if (isFetching) return;

    console.log("Workspaces downloaded: ", workspaces);

    if (workspaces?.length === 0 || !workspaces) {
      console.log("No workspaces found, create new one!");
      setOpenCreateWorkspaceModal(true);
    } else {
      navigate(`/workspaces/${workspaces[0]._id}`);
    }
  }, [isFetching, workspaces, navigate]);

  return (
    <>
      <div className="h-screen bg-slack">
        <h1>Home</h1>
        <UserButton />
      </div>
    </>
  );
}
