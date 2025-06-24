
import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import ProfileContent from "@/components/profile/ProfileContent";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-50 w-full flex-1 mx-auto border border-gray-200 overflow-hidden",
        "h-screen"
      )}
    >
      <DashboardSidebar />
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 w-full h-full">
          <DashboardNavbar />
          <ProfileContent />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
