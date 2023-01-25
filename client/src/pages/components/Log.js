import React, { useState } from "react";
import {
  Overlay,
  LogContainer,
  ContentSignIn,
  ContentLogIn,
} from "../../assets/style/logStyle";

const Log = ({ displayPage, togglePage }) => {
  const [page, setPage] = useState(togglePage);
  const [signinName, setSigninName] = useState();
  const [signinEmail, setSigninEmail] = useState();
  const [signinPassword, setSigninPassword] = useState();
  const [signinGuests, setSigninGuests] = useState();
  const [signinAlergy, setSigninAlergy] = useState();
  const [pwdConfirmation, setPwdConfirmation] = useState("");

  let signinData = {
    signinName,
    signinEmail,
    signinPassword,
    signinGuests,
    signinAlergy,
  };

  function submitSignIn(obj) {
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
              console.log(values);
            } else console.log("invalide type of food");
          } else console.log("guests must be in 1-9");
        } else console.log("invalide confirm pwd");
      } else console.log("invalide email");
    } else console.log("invalide name");
  }

  return (
    <Overlay onClick={() => displayPage(false)}>
      <LogContainer onClick={(e) => e.stopPropagation()}>
        {page === "signin" ? (
          <>
            <h1>Inscrivez-vous</h1>
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
                    e.target.value !== e.target.parentNode.firstChild.value
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
              <button onClick={() => submitSignIn(signinData)}>
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
            <ContentLogIn>
              <input
                type="text"
                placeholder="adresse e-mail"
                autoComplete="email"
              />
              <input
                type="text"
                placeholder="mot de passe"
                autoComplete="current-password"
              />
            </ContentLogIn>
            <div className="ctaLog">
              <button>Connection</button>
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