import React from "react";

interface LayoutProps {
  error: string;
  success?: string;
  children: JSX.Element|JSX.Element[];
}

const Login = (props: LayoutProps) => {

  return (
    <div className="login-layout-wrapper">
      <div className="left">

        <div className="title-large title-green">Welcome to Pastebin</div>
        <div className="title-large title-green">Sign in</div>
      </div>

      <div className="right">
        {props.error !== "" ? (
          <div className="error-message">
            <span>
              <i className="bi bi-exclamation-circle"></i>
            </span>
            <span>{props.error} ...</span>
          </div>
        ) : null}

        {props.success && props.success !== "" ? (
          <div className="success-message">
            <span>
              <i className="bi bi-check-circle"></i>
            </span>
            <span>{props.success} ...</span>
          </div>
        ) : null}

        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Login;