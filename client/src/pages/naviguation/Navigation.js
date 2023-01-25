import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../Home";
import Carte from "../Carte";
import Admin from "../Admin";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrivateRoute from "./PrivateRoute";

const Navigation = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carte" element={<Carte />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Navigation;
