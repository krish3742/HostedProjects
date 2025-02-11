import {
  Calendar,
  FileText,
  Lock,
  Info,
  UserCheck,
  SquarePen,
  Wallpaper,
  Share2,
  FileChartColumnIncreasing,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <div className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-white md:block">
      <nav className="h-full py-2 px-2">
        <ul className="space-y-1">
          <SidebarItem
            icon={<Calendar className="h-4 w-4" />}
            label="Workflow timeline"
          />
          <SidebarItem
            icon={<FileText className="h-4 w-4" />}
            label="User details"
          />
          <SidebarItem
            icon={<FileChartColumnIncreasing className="h-4 w-4" />}
            label="Change details"
          />
          <SidebarItem
            icon={<Lock className="h-4 w-4" />}
            label="View permissions"
            count="02"
          />
          <SidebarItem
            icon={<Info className="h-4 w-4" />}
            label="Pending requests"
            count="04"
          />
          <SidebarItem
            icon={<UserCheck className="h-4 w-4" />}
            label="Current access"
            count="01"
          />
          <SidebarItem
            icon={<SquarePen className="h-4 w-4" />}
            label="Signatures"
            count="02"
          />
          <SidebarItem
            icon={<Wallpaper className="h-4 w-4" />}
            label="System details"
          />
          <div className="w-full border-t-2"></div>
          <SidebarItem
            icon={<Share2 className="h-4 w-4" />}
            label="Sharing settings"
          />
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
