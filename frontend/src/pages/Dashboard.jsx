import React from "react";
import { Link } from "react-router-dom";
import AccountBalance from "../components/AccountBalance";
import ProfileNameTag from "../components/ProfileNameTag";
import PaymentRequests from "../components/PaymentRequests";

const Dashboard = () => {
  const renderNavButton = (link, task) => (
    <button>
      <Link
        to={link}
        state={{ task }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {task}
      </Link>
    </button>
  );

  return (
    <div>
      <ProfileNameTag />
      <AccountBalance />
      <div>
        {renderNavButton("/search", "sendmoney")}
        {renderNavButton("/search", "requestmoney")}
        {renderNavButton("/settings", "settings")}
      </div>
      <PaymentRequests />
    </div>
  );
};

export default Dashboard;
