import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { userServiceApi } from "../services/axios";
import Info from "../layouts/info";
import BackButton from "../components/back";
import { useLocation, useNavigate } from "react-router";

const schema = Yup.object().shape({
  password: Yup.string().min(8).required("Required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "must be same as password")
    .required("Required"),
});

const ResetPassword = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  
  // Access the token from the URL parameters
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  return (
    <div className="center-container">
    <BackButton call={() => navigate("/login")} />
      <Info error={error} success={success}>
        <div className="form-container">
          <Formik
            initialValues={{ password: "", confirm: "" }}
            validationSchema={schema}
            onSubmit={({ password }) => {
              userServiceApi
                .post("/profile/reset-password", { password, token })
                .then(() => {
                  setError("");
                  setSuccess("Password reset successfully! You may go back");
                })
                .catch((err) => {
                    console.log(err);
                    const errorMsg = err.response?.data?.error || "Error occurred";
                    setError(errorMsg);
                });
            }}
          >
            {({ errors, touched, getFieldProps, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...getFieldProps("password")}
                  />
                  <div className="form-error-text">
                    {touched.password && errors.password
                      ? errors.password
                      : null}
                  </div>
                </div>

                <div className="input-container">
                  <input
                    id="confirm"
                    type="password"
                    placeholder="Confirm Password"
                    {...getFieldProps("confirm")}
                  />
                  <div className="form-error-text">
                    {touched.confirm && errors.confirm ? errors.confirm : null}
                  </div>
                </div>

                <button className="button-primary" type="submit">
                  Confirm
                </button>
              </form>
            )}
          </Formik>
        </div>
      </Info>
    </div>
  );
};

export default ResetPassword;
