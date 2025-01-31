import AddMemberContext from "@/context/AddMemberContext";
import { useContext } from "react";

export const useAddMemberModal = () => {
  return useContext(AddMemberContext);
};
