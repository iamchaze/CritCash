import { Link } from "react-router-dom";
const MobileNavBar = () => {
  const renderNavButton = (link, task, svg) => (
    <div className="flex flex-col items-center justify-center gap-1 flex-wrap">
      <Link
        to={link}
        state={{ task }}
        style={{ textDecoration: "none", color: "inherit" }}
        className="flex flex-col items-center gap-1"
      >
        <div className="bg-button1 w-15 h-15 rounded-full cursor-pointer relative shadow-lg/10 border-2 border-accent4">
          <img
            className="w-7 h-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src={svg}
            alt={task}
          />
        </div>

        <span className="text-sm font-[REM]">
          {task === "sendmoney"
            ? "Send"
            : task === "requestmoney"
            ? "Request"
            : task}
        </span>
      </Link>
    </div>
  );
  return (
    <>
      {renderNavButton("/search", "sendmoney", "/images/Send.svg")}
      {renderNavButton("/search", "requestmoney", "/images/Request.svg")}
      {renderNavButton("/history", "History", "/images/History.svg")}
      {renderNavButton("/deposit", "Deposit", "/images/Deposit.svg")}
    </>
  );
};

export default MobileNavBar;
