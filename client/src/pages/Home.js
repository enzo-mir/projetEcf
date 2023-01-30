import React, { useEffect, useState } from "react";
import heroImage from "../assets/images/heroImage.jpg";
import img1 from "../assets/images/quelle-specialite-savoie.jpg";
import img2 from "../assets/images/raclette.jpg";
import Reserv from "./components/Reserv";
import {
  Wrapper,
  HeroSection,
  ContextText,
  SectionPlats,
} from "../assets/style/homeStyle";

const Home = () => {
  const [res, setRes] = useState(false);

  // eslint-disable-next-line no-unused-expressions
  if (window.localStorage.getItem("adminLogin"))
    window.localStorage.clear("adminLogin");

  useEffect(() => {
    document.querySelectorAll(".btnReserve").forEach((resBtn) => {
      resBtn.addEventListener("click", () => {
        setRes(true);
      });
    });
  }, []);

  return (
    <>
      <Wrapper>
        {res && <Reserv res={setRes} />}
        <HeroSection>
          <div className="headerPage">
            <img src={heroImage} alt="accueil" />
            <h1>Le Quai Antique</h1>
          </div>
          <ContextText>
            <p>
              Venez découvrir la Savoie à travers une expérience gastronomique,
              installé à Chambéry, Le Quai Antique saura vous satisfaire tout au
              long de votre repas.
            </p>
          </ContextText>
        </HeroSection>
        <SectionPlats>
          <img src={img1} alt="img" />
          <img src={img2} alt="img" />
          <p>
            Nos plats traditionnels de la Savoie charmeront à coup sûr vos
            papilles gustatives alors qu’attendez-vous ? <br />
            <br />
            Venez à table !
          </p>
          <button className="btnReserve">Réservez une table</button>
        </SectionPlats>
      </Wrapper>
    </>
  );
};

export default Home;
