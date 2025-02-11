import { ChevronDown, Plus, ChevronsRight } from "lucide-react";

function SecondNavbar() {
  return (
    <div className="border-b overflow-x-auto">
      <div className="flex h-12 items-center px-4 gap-4 min-w-max">
        <div className="grid grid-cols-2 gap-[1px]">
          <div className="border-black border-2 border-solid w-2 h-2"></div>
          <div className="border-black border-2 border-solid w-2 h-2"></div>
          <div className="border-black border-2 border-solid w-2 h-2"></div>
          <div className="border-black border-2 border-solid w-2 h-2"></div>
        </div>
        <button>Home</button>
        <button>My learnings</button>
        <button className="flex items-center gap-1">
          Document actions
          <ChevronDown className="h-4 w-4" />
        </button>
        <button>Quality management</button>
        <button className="flex items-center gap-1">
          Risk management
          <ChevronDown className="h-4 w-4" />
        </button>
        <button className="bg-[#e9ecef] rounded-full">
          <ChevronsRight className="h-5 w-5" />
        </button>
        <div className="ml-auto flex items-center gap-2 bg-blue-600 px-3 py-1 text-white rounded-[10px]">
          <button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Create record</span>
          </button>
          <button className="border-l-2 pl-1">
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SecondNavbar;
