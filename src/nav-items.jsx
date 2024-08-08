import { Home, UserCircle, Settings, Bell, Users } from "lucide-react";
import Index from "./pages/Index.jsx";
import FamilyTree from "./pages/FamilyTree.jsx";
import Profile from "./pages/Profile.jsx";
import SettingsPage from "./pages/Settings.jsx";
import Notifications from "./pages/Notifications.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Family Tree",
    to: "/family-tree",
    icon: <Users className="h-4 w-4" />,
    page: <FamilyTree />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: <UserCircle className="h-4 w-4" />,
    page: <Profile />,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <Settings className="h-4 w-4" />,
    page: <SettingsPage />,
  },
  {
    title: "Notifications",
    to: "/notifications",
    icon: <Bell className="h-4 w-4" />,
    page: <Notifications />,
  },
];
