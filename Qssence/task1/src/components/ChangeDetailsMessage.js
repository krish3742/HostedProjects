import { CircleArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import ProgressTracker from "./ProgressTracker";
import { setIsModalOpen } from "../redux/slice/stagesSlice";

function ChangeDetailsMessage() {
  const dispatch = useDispatch();
  const currentStage = useSelector((state) => state.stages.currentStage);
  return (
    <>
      <div className="border-t-2 border-t-blue-700 border-b-2 border-b-red-700 w-full">
        <div className="bg-slate-300 px-4 py-1 flex items-center gap-[1rem] text-red-800 border-t-blue-950 border-b-red-950">
          <CircleArrowRight className="h-5 w-5" />
          <h1>Change Execution & Release Approval</h1>
          <h5 className="text-yellow-600">26 Mar 2024</h5>
          <button className="text-blue-700">Show less</button>
          <div className="ml-auto bg-blue-600 p-1 px-4 text-white rounded-[5px]">
            <button
              className="flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => dispatch(setIsModalOpen(true))}
              disabled={currentStage === "completed"}
            >
              <span>Stage</span>
            </button>
          </div>
        </div>
      </div>
      <ProgressTracker />
    </>
  );
}

export default ChangeDetailsMessage;
