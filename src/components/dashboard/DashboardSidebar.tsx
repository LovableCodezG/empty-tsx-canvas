
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "@/components/ui/sidebar";
import { Home, MapPin, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dashboardData from "@/data/dashboard.json";

const iconMap = {
  home: Home,
  map: MapPin,
};

const DashboardSidebar = () => {
  const [open, setOpen] = useState(false);
  
  // Filter out profile and settings from main navigation
  const mainNavItems = dashboardData.navigation.filter(item => 
    !['user', 'settings'].includes(item.icon)
  );

  const links = mainNavItems.map(item => ({
    label: item.label,
    href: item.path,
    icon: {
      home: <Home className="text-spot-primary h-5 w-5 flex-shrink-0" />,
      map: <MapPin className="text-spot-primary h-5 w-5 flex-shrink-0" />,
    }[item.icon] || <Home className="text-spot-primary h-5 w-5 flex-shrink-0" />
  }));

  const { user } = dashboardData;

  return (
    <TooltipProvider delayDuration={10}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-0.5">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <UserProfileWithLogout open={open} user={user} />
          </div>
        </SidebarBody>
      </Sidebar>
    </TooltipProvider>
  );
};

const UserProfileWithLogout = ({ open, user }: { open: boolean; user: any }) => {
  return (
    <div className="flex items-center gap-2 py-1 px-0 min-h-[48px]">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link 
            to="/profile"
            className="flex items-center gap-2 flex-1 hover:bg-spot-primary/10 rounded transition-colors py-1"
          >
            <Avatar className="h-6 w-6 flex-shrink-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-spot-primary/10 text-spot-primary text-xs font-medium">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {open && (
              <span className="text-spot-primary text-sm whitespace-nowrap">
                {user.name}
              </span>
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Your Profile</p>
        </TooltipContent>
      </Tooltip>
      {open && (
        <Link
          to="/login"
          className="flex items-center justify-center w-6 h-6 hover:bg-red-100 rounded transition-colors"
        >
          <LogOut className="text-red-600 h-4 w-4 flex-shrink-0" />
        </Link>
      )}
    </div>
  );
};

export const Logo = () => {
  return (
    <Link
      to="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-spot-primary py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-spot-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-spot-primary whitespace-pre"
      >
        SpotPlan
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-spot-primary py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-spot-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

export default DashboardSidebar;
