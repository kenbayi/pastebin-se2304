import React from "react";
import ReactDOM from 'react-dom/client'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss"
import App from "./App";

const rootElement = document.getElementById('root');


if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
      <React.StrictMode>
          <App />
      </React.StrictMode>
  );
}
