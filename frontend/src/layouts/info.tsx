import React from "react";


interface InfoProps {
  error: string;
  success?: string;
  children: JSX.Element|JSX.Element[];
}

const Info = (props: InfoProps) => {


  return (
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
   
  );
};

export default Info;