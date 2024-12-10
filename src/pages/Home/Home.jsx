import { UserButton } from "@/components/atoms/UserButton/UserButton";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-slack flex-col">
        <h1>Home</h1>
        <UserButton />
      </div>
    </>
  );
}
