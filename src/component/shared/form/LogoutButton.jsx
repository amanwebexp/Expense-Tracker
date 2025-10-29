"use client";

import { signOut } from "next-auth/react";
import React from "react";
import useLocalStorage from "use-local-storage";

const LogoutButton = () => {
  const [currentLogin, setCurrentLogin] = useLocalStorage("currentLogin", "");

  const handleLogout = async () => {
    // Clear local storage value
    setCurrentLogin("");
    // Then sign out
    await signOut();
  };

  return (
    <div>
      <button onClick={handleLogout}>
        Sign out
      </button>
    </div>
  );
};

export default LogoutButton;
