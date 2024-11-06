import React, { useContext, useState, useEffect } from "react";
import { RouteProps } from "react-router";
import { AuthContext } from "../contexts/auth";
import "../services/axios";

const Profile = (props: RouteProps) => {
  const authContext = useContext(AuthContext);

  return (
    <div className="profile-wrapper">
      <div className="left-panel">
        <div className="person-icon">
          <i className="bi bi-person-circle"></i>
        </div>
        <div className="text-normal username">{authContext.username} </div>
        <button onClick={authContext.logout} className="button-primary">
          Logout
        </button>
      </div>

      <div className="right-panel">
        <span className="title-small">Profile</span>  
        <div className="text-normal username">Email: {authContext.email} </div>  
      </div>
    </div>
  );
};

export default Profile;