import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { setActiveMenu } from "../redux/slice/menuSlice";

function AccordionItem({ title, children, defaultOpen = false }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const activeMenu = useSelector((state) => state.menu.activeMenu);
  useEffect(() => {
    if (activeMenu === title) {
      const button = document.getElementById(title);
      if (!isOpen) {
        button.click();
      }
    } else if (activeMenu !== title && isOpen) {
      setIsOpen(false);
    }
  }, [activeMenu]);
  return (
    <div>
      <button
        id={title}
        className="flex w-full items-center gap-[1rem] px-4 py-3 text-left"
        onClick={() => {
          setIsOpen(!isOpen);
          dispatch(setActiveMenu(title));
        }}
      >
        <ChevronRight
          className={`h-5 w-5 text-gray-500 transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </button>
      {isOpen && (
        <div className="px-4 pb-2 text-sm text-gray-600">{children}</div>
      )}
    </div>
  );
}

export default AccordionItem;
