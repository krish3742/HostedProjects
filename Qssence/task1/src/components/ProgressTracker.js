import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "../lib/utils";
import { setCurrentStage, setIsModalOpen } from "../redux/slice/stagesSlice";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Confirm Stage Transition</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function Button({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function ProgressTracker() {
  const dispatch = useDispatch();
  const stages = useSelector((state) => state.stages.stages);
  const isModalOpen = useSelector((state) => state.stages.isModalOpen);
  const currentStage = useSelector((state) => state.stages.currentStage);
  const getNextStage = (stage) => {
    const currentIndex = stages.indexOf(stage);
    return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : null;
  };
  const getStageColor = (stage) => {
    if (stage === currentStage) {
      return "bg-blue-500 border-blue-500 text-white";
    }
    if (stages.indexOf(stage) < stages.indexOf(currentStage)) {
      return "bg-green-500 border-green-500 text-white";
    }
    return "bg-gray-200 border-gray-200 text-gray-600";
  };
  const handleStageTransition = () => {
    const nextStage = getNextStage(currentStage);
    if (nextStage) {
      dispatch(setCurrentStage(nextStage));
      dispatch(setIsModalOpen(false));
    }
  };
  const getStageLabel = (stage) => {
    return stage
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const getDialogContent = () => {
    const nextStage = getNextStage(currentStage);
    if (!nextStage) {
      return "";
    }
    return `Send to ${getStageLabel(nextStage)}`;
  };

  return (
    <div className="px-6 py-2 border-b-2 bg-white">
      <div className="relative">
        <div className="flex flex-col sm:flex-row justify-between w-full items-center gap-4">
          {stages.map((stage, index) =>
            index === 0 ? (
              <div
                key={stage}
                className="relative flex items-center w-full sm:w-[25%]"
              >
                <div
                  className={cn(
                    "w-full flex h-6 items-center justify-center text-sm md:text-base rounded-l-full",
                    getStageColor(stage)
                  )}
                >
                  <span className="font-medium px-2 text-center">
                    {getStageLabel(stage)}
                  </span>
                </div>
                <div
                  className={cn(
                    "absolute top-[-4px] right-[-20px]",
                    getStageColor(stage).includes("blue")
                      ? "text-blue-500"
                      : getStageColor(stage).includes("gray")
                      ? "text-gray-200"
                      : "text-green-500"
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="bi bi-caret-right-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                  </svg>
                </div>
              </div>
            ) : index === stages.length - 1 ? (
              <div
                key={stage}
                className="relative flex items-center w-full sm:w-[25%]"
              >
                <div
                  className={cn(
                    "w-full h-6 flex items-center justify-center rounded-r-full border text-sm md:text-base",
                    getStageColor(stage)
                  )}
                >
                  <span className="font-medium px-2 text-center">
                    {getStageLabel(stage)}
                  </span>
                </div>
                <div className="absolute top-[-5px] left-[-12px] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    className="bi bi-caret-right-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                  </svg>
                </div>
              </div>
            ) : (
              <div
                key={stage}
                className="relative flex items-center w-full sm:w-[25%]"
              >
                <div
                  className={cn(
                    "w-full h-6 flex items-center justify-center rounded border text-sm lg:text-base",
                    getStageColor(stage)
                  )}
                >
                  <span className="font-medium px-2 text-center">
                    {getStageLabel(stage)}
                  </span>
                </div>
                <div
                  className={cn(
                    "absolute top-[-4px] right-[-18px]",
                    getStageColor(stage).includes("blue")
                      ? "text-blue-500"
                      : getStageColor(stage).includes("gray")
                      ? "text-gray-200"
                      : "text-green-500"
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="bi bi-caret-right-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                  </svg>
                </div>
                <div className="absolute top-[-5px] left-[-12px] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    className="bi bi-caret-right-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                  </svg>
                </div>
              </div>
            )
          )}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="space-y-4">
            <p>{getDialogContent()}</p>
            <div className="flex justify-end gap-3">
              <Button
                className="bg-gray-500 hover:bg-gray-600"
                onClick={() => dispatch(setIsModalOpen(false))}
              >
                Cancel
              </Button>
              <Button onClick={handleStageTransition}>Confirm</Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default ProgressTracker;
