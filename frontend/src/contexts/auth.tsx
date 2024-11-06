import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../services/axios";
import { userServiceApi } from "../services/axios";

type ContextProps = {
  children: JSX.Element;
};

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export const AuthContext = createContext({
  id: 0,
  username: "",
  email: "",
  password: "",
  authenticated: false,
  accessToken: "",
  loading: true,
  authenticate: (user: User, token: string) => {},
  logout: () => {},
});

export default (props: ContextProps): JSX.Element => {
  const navigate = useNavigate();

  const [authentication, setAuthentication] = useState({
    id: 0,
    username: "",
    email: "",
    password: "",
    authenticated: false,
    accessToken: "",
    loading: true,
  });

  const checkAuthentication = () => {
    userServiceApi
      .post("/auth/check")
      .then((res) => authenticate(res.data.user, res.data.accessToken, false))
      .catch((error) => {
        setAuthentication({ ...authentication, loading: false });
      });
  };

  useEffect(() => {
    checkAuthentication();

    const interval = setInterval(checkAuthentication, 10 * 1000);

    return () => clearInterval(interval);
  }, []);

  const authenticate = (
    user: User,
    token: string,
    redirect: boolean = true
  ) => {
    setAuthentication({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      authenticated: true,
      accessToken: token,
      loading: false,
    });

    if (redirect) navigate("/");
  };

  const logout = async () => {
    await userServiceApi.post("/auth/logout");

    setAuthentication({
      id: 0,
      username: "",
      email: "",
      password: "",
      authenticated: false,
      accessToken: "",
      loading: false,
    });

    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        id: authentication.id,
        username: authentication.username,
        email: authentication.email,
        password: authentication.password,
        authenticated: authentication.authenticated,
        accessToken: authentication.accessToken,
        loading: authentication.loading,
        authenticate,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};