import React, { Children } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../Home";
import Carte from "../Carte";
import Admin from "../Admin";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminConfig from "../AdminConfig";
import PrivateRoute from "./PrivateRoute";

const Navigation = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carte" element={<Carte />} />
          <Route path="/admin" element={<Admin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin/config" element={<AdminConfig />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Navigation;
