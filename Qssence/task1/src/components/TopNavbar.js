import { Bell, Search, ChevronDown } from "lucide-react";
import logo from "../documents/logo.svg";
import avatar from "../documents/avatar.jpg";

function TopNavbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-[0.75rem]">
          <img src={logo} alt="Logo" />
          <div className="flex flex-col items-center">
            <strong className="text-xl font-bold text-blue-950 leading-none">
              QSSENCE
            </strong>
            <h5 className="text-[10px] italic text-blue-950 leading-none">
              Make it happen!
            </h5>
          </div>
        </div>
        <div className="hidden items-center bg-[#e9ecef] p-2 rounded-[10px] gap-[1rem] sm:flex">
          <div className="text-sm text-muted-foreground lg:w-[150px] md:w-[100px] pl-2">
            Record ID
          </div>
          <ChevronDown className="h-4 w-4" />
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Enter search value"
            className="lg:w-[300px] md:w-[200px] bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button>
            <Bell className="h-5 w-5" />
          </button>
          <button className="relative h-8 w-8 rounded-full">
            <img src={avatar} alt="Avatar" className="rounded-full h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
