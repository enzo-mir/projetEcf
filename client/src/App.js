import "./assets/style/App.css";
import GlobalStyle from "./pages/UI/GlobalStyle";
import Navigation from "./pages/naviguation/Navigation";

function App() {
  return (
    <>
      <GlobalStyle />
      <Navigation connected={false} />
    </>
  );
}

export default App;
