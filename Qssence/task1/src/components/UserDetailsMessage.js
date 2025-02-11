import { Info } from "lucide-react";

function UserDetailsMessage() {
  return (
    <div className="border-t-2 border-t-blue-950 border-b-2 border-b-red-950 w-full">
      <div className="bg-slate-300 px-4 py-1 flex items-center gap-[1rem] text-red-800 border-t-blue-950 border-b-red-950">
        <Info className="h-5 w-5" />
        <h1>Review and approve the user access request</h1>
        <div className="ml-auto bg-blue-600 p-1 px-3 text-white rounded-[5px]">
          <button className="flex items-center gap-1">
            <span>Accept</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsMessage;
