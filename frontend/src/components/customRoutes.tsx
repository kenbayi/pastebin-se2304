import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import Default from "../layouts/default";
import Login from "../pages/login";
import Signup from "../pages/signup";
import RequestPassword from "../pages/request-password";
import ResetPassword from "../pages/reset-password";
import PastesPage from "../pages/pastePage";
import PasteDetail from "../pages/pasteDetails";
import Profile from "../pages/profile";
import Loader from "./loading";
import UserPastes from "../pages/userPastes";
export default () => {
  const authContext = useContext(AuthContext);

  const getRoutes = (): JSX.Element => {
    if (authContext.loading) return <Loader />;
    if (authContext.authenticated) {
      const userMenu = [
        { name: "Pastes", link: "/" },
        { name: "Your Pastes", link: "/own"},
        { name: "Profile", link: "/profile" },
      ];
        return (
          <Default menu={userMenu}>
            <Routes>
              <Route path="/" element={<PastesPage />} /> 
              <Route path="/:hash" element={<PasteDetail />} /> 
              <Route path="/own" element={<UserPastes />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Default>
        
        );
       
      }   
    else {
      // if the user is not authenticated
      return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/request-password" element={<RequestPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      );
    }

  };

  return getRoutes();
};