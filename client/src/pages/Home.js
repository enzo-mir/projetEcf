import React, { useEffect, useState } from "react";
import heroImage from "../assets/images/heroImage.jpg";
import Reserv from "./components/Reserv";
import { imagesFetched } from "../data/fetchImage";

import {
  Wrapper,
  HeroSection,
  ContextText,
  SectionPlats,
} from "../assets/style/homeStyle";

const Home = () => {
  const [res, setRes] = useState(false);
  const [imagesApi, setImagesApi] = useState([]);
  // eslint-disable-next-line no-unused-expressions
  if (window.localStorage.getItem("adminLogin"))
    window.localStorage.clear("adminLogin");
  useEffect(() => {
    setImagesApi([]);
    document.querySelectorAll(".btnReserve").forEach((resBtn) => {
      resBtn.addEventListener("click", () => {
        setRes(true);
      });
    });
    imagesFetched().then((image) => {
      image.map((img) => {
        setImagesApi((prevImage) => {
          return [
            ...prevImage,
            {
              id: img.id,
              title: img.titre,
              desc: img.description,
              url: img.lien,
            },
          ];
        });
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
          <p>
            Nos plats traditionnels de la Savoie charmeront à coup sûr vos
            papilles gustatives alors qu’attendez-vous ? <br />
            <br />
            Venez à table !
          </p>
          <div className="imagesGalery">
            {imagesApi.map((images, id) => {
              return (
                <div key={id}>
                  <img src={images.url} alt="ok" loading="lazy" />
                  <span>
                    <h1>{images.title}</h1>
                    <p>{images.desc}</p>
                  </span>
                </div>
              );
            })}
          </div>
          <button className="btnReserve">Réservez une table</button>
        </SectionPlats>
      </Wrapper>
    </>
  );
};

export default Home;
