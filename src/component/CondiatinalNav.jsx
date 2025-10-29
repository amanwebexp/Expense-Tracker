"use client";

import { usePathname } from "next/navigation";
import ResponsiveAppBar from "./Navbar/Navbar";

const ConditionalNav = () => {
  const pathname = usePathname();

  // Hide Navbar on specific pages
  if (pathname === "/signup" || pathname === "/auth/signup") {
    return null;
  }

  console.log("Current Path:", pathname);

  return <ResponsiveAppBar />;
};

export default ConditionalNav;
