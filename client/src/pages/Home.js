import React, { useEffect, useState } from "react";
import heroImage from "../assets/images/heroImage.jpg";
import Reserv from "./components/Reserv";
import { imagesFetched } from "../data/fetchImage";
import { query } from "../data/fetchAllData";

import {
  Wrapper,
  HeroSection,
  ContextText,
  SectionPlats,
} from "../assets/style/homeStyle";

const Home = () => {
  const [res, setRes] = useState(false);
  const [imagesApi, setImagesApi] = useState([]);

  if (window.localStorage.getItem("adminLogin"))
    window.localStorage.clear("adminLogin");

  document.querySelectorAll(".btnReserve").forEach((resBtn) => {
    resBtn.addEventListener("click", () => {
      setRes(true);
    });
  });

  useEffect(() => {
    query().then((image) => setImagesApi(image.image));
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
          <p>
            Nos plats traditionnels de la Savoie charmeront à coup sûr vos
            papilles gustatives alors qu’attendez-vous ? <br />
            <br />
            Venez à table !
          </p>
          <div className="imagesGalery">
            {imagesApi.length > 0
              ? imagesApi.map((images, id) => {
                  return (
                    <div key={id}>
                      <img src={images.lien} alt="ok" loading="lazy" />
                      <span>
                        <h1>{images.titre}</h1>
                        <p>{images.description}</p>
                      </span>
                    </div>
                  );
                })
              : null}
          </div>
          <button className="btnReserve">Réservez une table</button>
        </SectionPlats>
      </Wrapper>
    </>
  );
};

export default Home;
