import React, { useEffect, useState, useContext } from "react";
import { pasteServiceApi } from "../services/axios";
import { AuthContext } from "../contexts/auth";
import Loader from "../components/loading";
import { useNavigate } from "react-router";
import Info from "../layouts/info";

interface Paste {
  pasteId: number;
  id: number;
  title: string;
  username: string;
  hash: string;
  isExpired: boolean;
  isDeleted: boolean; 
  expirationTime: number;
}

const UserPastes: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [pastes, setPastes] = useState<Paste[]>([]);
  const [deletedPastes, setDeletedPastes] = useState<Paste[]>([]);
  const [expiredPastes, setExpiredPastes] = useState<Paste[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(""); 
  const [success, setSuccess] = useState<string>(""); 

  // Helper function to fetch active and expired pastes
  const fetchPastes = async () => {
    try {
      const response = await pasteServiceApi.get(`/pastes/getPasteByUser/${authContext.id}`);
      const allPastes = response.data;
      filterPastes(allPastes);
    } catch (error) {
      console.error("Failed to fetch pastes:", error);
      setError("Failed to fetch pastes.");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Helper function to fetch deleted pastes
  const checkDeletedPastes = async () => {
    try {
      const response = await pasteServiceApi.get(`/pastes/deleted/${authContext.id}`);
      setDeletedPastes(response.data);
    } catch (error) {
      console.error("Failed to fetch deleted pastes:", error);
      setError("Failed to fetch deleted pastes.");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Unified function to refresh both active and deleted pastes
  const refreshPastes = async () => {
    setLoading(true);
    await fetchPastes();
    await checkDeletedPastes();
    setLoading(false);
  };

  useEffect(() => {
    // Call refreshPastes when the component mounts
    refreshPastes();

    // Update time display every 5 seconds
    const interval = setInterval(() => {
      setDeletedPastes((prevPastes) => 
        prevPastes.map((paste) => ({
          ...paste,
          expirationTime: paste.expirationTime > 1 ? paste.expirationTime - 1 : 0
        }))
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [authContext.id]);

  const filterPastes = (allPastes: Paste[]) => {
    const activePastes = allPastes.filter((paste) => !paste.isExpired && !paste.isDeleted);
    const expiredPastes = allPastes.filter((paste) => paste.isExpired && !paste.isDeleted);
    setExpiredPastes(expiredPastes);
    setPastes(activePastes);
  };

  const handleUndoDelete = async (pasteId: number) => {
    try {
      await pasteServiceApi.post(`/pastes/undo/${pasteId}`);
      setSuccess("Paste successfully restored!");
      setTimeout(() => setSuccess(""), 3000);
      refreshPastes(); // Refresh pastes after undoing delete
    } catch (error) {
      console.error("Failed to undo delete:", error);
      setError("Failed to restore paste.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDeletePaste = async (pasteId: number) => {
    try {
      await pasteServiceApi.delete(`/pastes/delete/${pasteId}`);
      setSuccess("Paste successfully deleted!");
      setTimeout(() => setSuccess(""), 3000);
      refreshPastes() // Refresh pastes after deletion
    } catch (error) {
      console.error("Failed to delete paste:", error);
      setError("Failed to delete paste.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${hours}h ${minutes}m ${s}s`;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page-container">
      <h2>Your Pastes</h2>
      <Info error={error} success={success}>
        {/* Pass an empty fragment as children */}
        <></>
      </Info>
      <div className="public-pastes" style={{ marginLeft: "5rem" }}>
        <h3>Active Pastes</h3>
        {pastes.length === 0 ? (
          <p>No active pastes available.</p>
        ) : (
          pastes.map((paste) => (
            <div
              key={paste.pasteId}
              className="paste-item d-flex justify-content-between align-items-center w-50"
              onClick={() => navigate(`/${paste.hash}`)}
            >
              <strong>{paste.title}</strong>
              <button
                className="btn btn-danger"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeletePaste(paste.pasteId);
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}

        <h3>Deleted Pastes</h3>
        {deletedPastes.length === 0 ? (
          <p>No temporary deleted pastes available.</p>
        ) : (
          deletedPastes.map((paste) => (
            <div key={paste.pasteId} className="paste-item d-flex justify-content-between align-items-center w-50">
              <strong>{paste.title} (Deleted)</strong>
              {paste.expirationTime !== undefined && paste.expirationTime > 0 ? (
                <span>Time left: {formatTime(paste.expirationTime)}</span>
              ) : (
                <span>Totally Deleted</span>
              )}
               {paste.expirationTime > 0 && (
                  <button className="btn btn-info" onClick={() => handleUndoDelete(paste.id)}>
                    Undo
                  </button>
                )}
            </div>
          ))
        )}

        <h3>Expired Pastes</h3>
        {expiredPastes.length === 0 ? (
          <p>No expired pastes available.</p>
        ) : (
          expiredPastes.map((paste) => (
            <div key={paste.pasteId} className="paste-item d-flex justify-content-between w-50">
              <strong>{paste.title} (Expired)</strong>
              <button className="btn btn-danger" onClick={() => handleDeletePaste(paste.pasteId)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserPastes;
