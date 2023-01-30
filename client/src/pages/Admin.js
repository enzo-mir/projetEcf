import React from "react";
import styled from "styled-components";

const Admin = () => {
  return (
    <Wrapper>
      <ImgWrapper>
        <h1>Galerie d'images</h1>
      </ImgWrapper>
      <HoursContainer>
        <h1>Heures d'ouvertures</h1>
      </HoursContainer>
      <CarteContainer>
        <h1>Carte du restaurant</h1>
      </CarteContainer>
    </Wrapper>
  );
};

const HoursContainer = styled.article``;
const ImgWrapper = styled.article``;
const CarteContainer = styled.article``;

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: 150px;
`;
export default Admin;
