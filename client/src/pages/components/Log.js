import React, { useState } from "react";
import { Overlay } from "../../assets/style/overlay";
import {
  LogContainer,
  ContentSignIn,
  ContentLogIn,
} from "../../assets/style/logStyle";
import postCreateAccount from "../../data/postCreateAccount";
import postConnection from "../../data/postConnection";
import ConnectedNav from "../naviguation/ConnectedNav";

const Log = ({ displayPage, togglePage }) => {
  const [page, setPage] = useState(togglePage);
  const [signinName, setSigninName] = useState();
  const [signinEmail, setSigninEmail] = useState();
  const [signinPassword, setSigninPassword] = useState();
  const [signinGuests, setSigninGuests] = useState();
  const [signinAlergy, setSigninAlergy] = useState();
  const [pwdConfirmation, setPwdConfirmation] = useState("");
  const [fromConfirmation, setFormConfirmation] = useState("");

  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [loginConfirmation, setLoginConfirmation] = useState("");

  let signinData = {
    signinName,
    signinEmail,
    signinPassword,
    signinGuests,
    signinAlergy,
  };

  function submitSignIn(obj, event) {
    let values = Object.values(obj);
    var nameRegex = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
    var emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
    );
    var alergyRegex = nameRegex;
    var guestsRegex = new RegExp(/^([1-9])$/);

    if (nameRegex.test(values[0]) && values[0]) {
      if (emailRegex.test(values[1]) && values[1]) {
        if (pwdConfirmation === null && values[2]) {
          if (guestsRegex.test(values[3]) && values[3]) {
            if (alergyRegex.test(values[4])) {
              postCreateAccount(
                values[0],
                values[1],
                values[2],
                values[3],
                values[4]
              ).then((data) =>
                Object.keys(data) == "error"
                  ? setFormConfirmation(Object.values(data))
                  : (setFormConfirmation("Le compte a été créé !"),
                    (event.target.style.pointerEvents = "none"),
                    setTimeout(() => {
                      displayPage(false);
                      event.target.style.pointerEvents = "auto";
                    }, 2000))
              );
            } else
              setFormConfirmation(
                "aucuns caractères spéciaux ni numériques dans les alèrgies"
              );
          } else
            setFormConfirmation(
              "le nombres de convives doit être entre 1 et 9 compris"
            );
        } else
          setFormConfirmation(
            pwdConfirmation ? pwdConfirmation : "champs mot de passe vide"
          );
      } else setFormConfirmation("email invalide");
    } else
      setFormConfirmation(
        "le champs nom et vide ou comporte autre choses que des lettres"
      );
  }

  function submitLogin(email, password, event) {
    postConnection(email, password).then((data) =>
      Object.keys(data) == "erreur"
        ? setLoginConfirmation(Object.values(data))
        : (setLoginConfirmation("Vous êtes connecté"),
          window.localStorage.setItem("userLogin", JSON.stringify(data)),
          (<ConnectedNav connected={true} />),
          (window.location.href = "/"),
          (event.target.style.pointerEvents = "none"),
          setTimeout(() => {
            event.target.style.pointerEvents = "auto";
            displayPage(false);
          }, 2000))
    );
  }
  return (
    <Overlay onClick={() => displayPage(false)}>
      <LogContainer onClick={(e) => e.stopPropagation()}>
        {page === "signin" ? (
          <>
            <h1>Inscrivez-vous</h1>
            {fromConfirmation ? <p>{fromConfirmation}</p> : null}
            <ContentSignIn>
              <div className="profil">
                <input
                  type="text"
                  placeholder="nom"
                  autoComplete="family-name"
                  onChange={(e) => setSigninName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="adresse e-mail"
                  autoComplete="email"
                  onChange={(e) => setSigninEmail(e.target.value)}
                />
              </div>
              <div className="password">
                <input
                  type="password"
                  placeholder="mot de passe"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setSigninPassword(e.target.value);
                    e.target.value !== e.target.parentNode.children[1].value
                      ? setPwdConfirmation("mot de passe non conforme")
                      : setPwdConfirmation(null);
                  }}
                />
                <input
                  type="password"
                  placeholder="confirmation mot de passe"
                  autoComplete="current-password"
                  onChange={(e) => {
                    e.target.value !== e.target.parentNode.firstChild.value
                      ? setPwdConfirmation("mot de passe non conforme")
                      : setPwdConfirmation(null);
                  }}
                />
              </div>
              <div className="adds">
                <input
                  type="number"
                  min="1"
                  placeholder="convives par défaut (1-9)"
                  onChange={(e) => setSigninGuests(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="alergies (ex : tomates, carotte)"
                  onChange={(e) => setSigninAlergy(e.target.value)}
                />
              </div>
            </ContentSignIn>
            <div className="ctaLog">
              <button onClick={(e) => submitSignIn(signinData, e)}>
                Créer un compte
              </button>
              <p
                onClick={() => {
                  setPage("login");
                }}
              >
                vous avez déjà un compte ? connectez-vous
              </p>
            </div>
          </>
        ) : page === "login" ? (
          <>
            <h1>Connectez-vous</h1>
            {loginConfirmation ? <p>{loginConfirmation}</p> : null}

            <ContentLogIn>
              <input
                type="text"
                placeholder="adresse e-mail"
                autoComplete="email"
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="mot de passe"
                autoComplete="current-password"
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
            </ContentLogIn>
            <div className="ctaLog">
              <button
                onClick={(e) => {
                  submitLogin(loginEmail, loginPassword, e);
                }}
              >
                Connection
              </button>
              <p
                onClick={() => {
                  setPage("signin");
                }}
              >
                vous n'avez pas encore de compte ? créez un compte
              </p>
            </div>
          </>
        ) : null}
      </LogContainer>
    </Overlay>
  );
};

export default Log;
