import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer";
import AuthProvider from "./contexts/auth";
import CustomRoutes from "./components/customRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomRoutes />
      </AuthProvider>
      <Footer />
    </BrowserRouter>
  );
};

export default App;