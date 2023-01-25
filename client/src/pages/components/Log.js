import React, { useState } from "react";
import {
  Overlay,
  LogContainer,
  ContentSignIn,
  ContentLogIn,
} from "../../assets/style/logStyle";

const Log = ({ displayPage, togglePage }) => {
  const [page, setPage] = useState(togglePage);
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
                  autocomplete="family-name"
                />
                <input
                  type="email"
                  placeholder="adresse e-mail"
                  autocomplete="email"
                />
              </div>
              <div className="password">
                <input
                  type="password"
                  placeholder="mot de passe"
                  autocomplete="new-password"
                />
                <input
                  type="password"
                  placeholder="confirmation mot de passe"
                  autocomplete="current-password"
                />
              </div>
              <div className="adds">
                <input
                  type="number"
                  min="1"
                  placeholder="convives par défaut (1-9)"
                />
                <input
                  type="text"
                  placeholder="alergies (ex : tomates, carotte)"
                />
              </div>
            </ContentSignIn>
            <div className="ctaLog">
              <button>Créer un compte</button>
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
                autocomplete="email"
              />
              <input
                type="text"
                placeholder="mot de passe"
                autocomplete="current-password"
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
