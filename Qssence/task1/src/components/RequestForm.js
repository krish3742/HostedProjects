import { Star, PencilLine, Ellipsis } from "lucide-react";

function RequestForm() {
  return (
    <div className="bg-blue-50 px-4 py-1 flex items-center gap-[1rem] w-full text-blue-500">
      <Star className="h-4 w-4" />
      <h1 className="text-lg font-semibold">
        User access request form: QS-094567
      </h1>
      <div className="bg-green-300 px-6 rounded-2xl w-max text-red-500">
        Processing request
      </div>
      <div className="ml-auto flex items-center gap-4">
        <button>
          <PencilLine className="h-5 w-5" />
        </button>
        <button>
          <Ellipsis className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default RequestForm;
