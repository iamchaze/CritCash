import React from "react";
import AccountBalance from "../components/AccountBalance";
import ProfileNameTag from "../components/ProfileNameTag";
import NavButton from "../components/NavButton";

const Dashboard = () => {
  return (
    <div>
      <ProfileNameTag />
      <AccountBalance />
      <div>
        <NavButton link="/sendmoney" text="Send" />
        <NavButton link="/request" text="Request" />
        <NavButton link="/history" text="History" />
        <NavButton link="/deposit" text="Deposit" />
      </div>
      <div>
        <NavButton link="/settings" text="Settings" />
      </div>
    </div>
  );
};

export default Dashboard;
