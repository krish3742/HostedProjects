import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import MainContent from "./components/MainContent";
import RequestForm from "./components/RequestForm";
import SecondNavbar from "./components/SecondNavbar";
import UserDetailsMessage from "./components/UserDetailsMessage";
import ChangeDetailsMessage from "./components/ChangeDetailsMessage";
import { useSelector } from "react-redux";

export default function App() {
  const activeMenu = useSelector((state) => state.menu.activeMenu);
  return (
    <div className="bg-gray-50">
      <TopNavbar />
      <SecondNavbar />
      <RequestForm />
      {activeMenu === "User details" ? (
        <UserDetailsMessage />
      ) : activeMenu === "Change details" ? (
        <ChangeDetailsMessage />
      ) : (
        <></>
      )}
      <div className="flex">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}
