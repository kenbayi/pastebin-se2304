import React, { useEffect, useState, useContext } from "react";
import { pasteServiceApi } from "../services/axios";
import { useNavigate } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../contexts/auth";
import Info from "../layouts/info";
import Loader from "../components/loading";

interface Paste {
  pasteId: string;
  title: string;
  username: string;
  hash: string;
  isExpired: boolean;
  isDeleted: boolean; 
}

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  expiration: Yup.string().nullable(), 
});

const PastesPage: React.FC = () => {
  const [pastes, setPastes] = useState<Paste[]>([]);
  const [validPastes, setValidPastes] = useState<Paste[]>([]); 
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [error, setError] = useState<any>("");
  const [success, setSuccess] = useState<string>("");

  const fetchPastes = async () => {
    try {
      const response = await pasteServiceApi.get("/pastes/getAll");
      setPastes(response.data);
    } catch (error) {
      console.error("Failed to fetch pastes:", error);
    }
  };

  const filterValidPastes = () => {
    const valid = pastes.filter((paste) => !paste.isExpired && !paste.isDeleted); // Select non-expired and non-deleted pastes
    setValidPastes(valid);
  };

  useEffect(() => {
    fetchPastes();
  }, []);

  useEffect(() => {
    filterValidPastes();
  }, [pastes]);

  return (
    <Info error={error} success={success}>
      <div className="page-container">
        <div className="paste-form">
          <h2>New Paste</h2>
          <Formik
            initialValues={{
              title: "",
              content: "",
              expiration: "",
            }}
            validationSchema={schema}
            onSubmit={({ title, content, expiration }) => {
              const expirationValue = expiration ? Number(expiration) : null;
              pasteServiceApi
                .post("/pastes/create", {
                  title,
                  content,
                  expiresAt: expirationValue,
                  userid: authContext.id,
                })
                .then(() => {
                  setError("");
                  setSuccess("Paste created successfully!");
                  fetchPastes();
                })
                .catch((err) => {
                  let error = err.message;
                  if (err?.response?.data)
                    error = JSON.stringify(err.response.data);
                  setError(error);
                });
            }}
          >
            {({ errors, touched, getFieldProps, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <textarea
                  placeholder="Write your paste here..."
                  {...getFieldProps("content")}
                />
                {touched.content && errors.content && (
                  <div className="form-error-text">{errors.content}</div>
                )}
                <input
                  type="text"
                  placeholder="Title"
                  {...getFieldProps("title")}
                />
                {touched.title && errors.title && (
                  <div className="form-error-text">{errors.title}</div>
                )}
                <select {...getFieldProps("expiration")}>
                  <option value="">No</option>
                  <option value="300">5 min</option>
                  <option value="600">10 min</option>
                  <option value="3600">1 hour</option>
                  <option value="43200">12 hours</option>
                  <option value="86400">24 hours</option>
                  <option value="604800">1 week</option>
                  <option value="2592000">1 month</option>
                </select>
                <button type="submit">Submit Paste</button>
              </form>
            )}
          </Formik>
        </div>

        <div className="public-pastes">
          <h3>Public Pastes</h3>
          {validPastes.length === 0 ? (
            <>
              <Loader />
              <p>No pastes available yet.</p>
            </>
          ) : (
            validPastes.map((paste) => (
              <div
                key={paste.pasteId}
                className="paste-item d-flex justify-content-between align-items-center"
                onClick={() => navigate(`/${paste.hash}`)}
              >
                <strong>{paste.title}</strong>
                <span>Author: {paste.username}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </Info>
  );
};

export default PastesPage;
