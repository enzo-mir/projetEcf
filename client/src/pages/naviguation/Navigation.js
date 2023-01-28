import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../Home";
import Carte from "../Carte";
import Admin from "../Admin";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrivateRoute from "./PrivateRoute";
import Connect from "../../data/Connect";

const Navigation = ({ connected }) => {
  const [isConnected, setIsConnected] = useState(connected);
  return (
    <>
      {<Connect isConnected={setIsConnected} />}
      <BrowserRouter>
        {isConnected === false ? (
          <>
            <Header isConnected={false} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/carte" element={<Carte />} />
              <Route element={<PrivateRoute />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Routes>
          </>
        ) : (
          <>
            <Header isConnected={true} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/carte" element={<Carte />} />
              <Route element={<PrivateRoute />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Routes>
          </>
        )}
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Navigation;
