import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

import PrivateRoute from "./components/PrivateRoute";

import Profile from "./pages/Profile";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import SearchPage from "./pages/SearchPage";
import TransactionPage from "./pages/TransactionPage";
import TransactionDetails from "./pages/TransactionDetails";
import CommonHistory from "./pages/CommonHistory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/transactiondetails" element={<TransactionDetails />} />
            <Route path="/commonhistory" element={<CommonHistory />} />
            <Route path="/transaction" element={<TransactionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
