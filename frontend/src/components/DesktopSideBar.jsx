import ProfileNameTag from "./ProfileNameTag";
import { Link } from "react-router-dom";

const DesktopSideBar = () => {
  return (
    <>
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-inherit">
        <div className="p-4 border-b">
          <ProfileNameTag />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <img src="/images/Home.svg" className="w-6 h-6" alt="home" />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            to="/search"
            state={{ task: "sendmoney" }}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <img src="/images/Send.svg" className="w-6 h-6" alt="send" />
            <span className="font-medium">Send</span>
          </Link>
          <Link
            to="/search"
            state={{ task: "requestmoney" }}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <img src="/images/Request.svg" className="w-6 h-6" alt="request" />
            <span className="font-medium">Request</span>
          </Link>
          <Link
            to="/deposit"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <img src="/images/Deposit.svg" className="w-6 h-6" alt="deposit" />
            <span className="font-medium">Deposit</span>
          </Link>
          <Link
            to="/history"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <img src="/images/History.svg" className="w-6 h-6" alt="history" />
            <span className="font-medium">History</span>
          </Link>
        </nav>
        <div className="p-4 text-sm text-gray-500">About Us</div>
      </aside>
    </>
  );
};

export default DesktopSideBar;
