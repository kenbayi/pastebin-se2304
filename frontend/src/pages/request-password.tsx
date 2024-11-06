import React, { useState, useContext} from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { userServiceApi } from "../services/axios";
import Info from "../layouts/info";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const RequestPassword = (): JSX.Element => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  return (
    <div className = "center-container">
      <Info error={error} success={success}>
        <div className="form-container">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={schema}
            onSubmit={({ email }) => {
              userServiceApi
                .post("/profile/request-password", { email })
                .then(() => {
                  setError("");
                  setSuccess("Password reset email sent!");
                })
                .catch((err) => {
                  console.log(err);
                  const errorMsg = err.response.data.error || "Error occurred";
                  setError(errorMsg);
                });
            }}
          >
            {({ errors, touched, getFieldProps, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...getFieldProps("email")}
                  />
                  <div className="form-error-text">
                    {touched.email && errors.email ? errors.email : null}
                  </div>
                </div>

                <button className="button-primary" type="submit">
                  Reset Password
                </button>
              </form>
            )}
          </Formik>
        </div>
      </Info>
    </div>
  );
};

export default RequestPassword;
