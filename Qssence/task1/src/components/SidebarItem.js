import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu } from "../redux/slice/menuSlice";

function SidebarItem({ icon, label, count }) {
  const dispatch = useDispatch();
  const activeMenu = useSelector((state) => state.menu.activeMenu);
  return (
    <li onClick={() => dispatch(setActiveMenu(label))}>
      <button
        className={`flex items-center px-4 py-2 text-sm border-l-2 w-full ${
          activeMenu === label ? "" : "border-transparent"
        } ${
          activeMenu === label
            ? "bg-[#e9ecef] border-l-2 border-red-950"
            : "text-gray-700 hover:bg-[#e9ecef] hover:border-l-2 hover:border-blue-950"
        }`}
      >
        <span className="mr-3">{icon}</span>
        {count ? (
          <span>
            {label} ({count})
          </span>
        ) : (
          <span>{label}</span>
        )}
      </button>
    </li>
  );
}

export default SidebarItem;
