import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import fondoHeroe from "./assets/1354.jpg";
import { useState, useEffect } from "react";

function App() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
  });
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        outerHeight: window.outerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
  }, []);

  const [logueado, setLogueado] = useState(false);
  const MySection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 1.5rem;
    align-items: stretch;
    background-color: #f5ad42;
  `;

  //Eliminar el token
  window.onbeforeunload = () => {
    window.localStorage.removeItem("token");
    setLogueado(false);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      {window.localStorage.getItem("token") === null ? (
        <MySection
          style={{
            backgroundImage: `url(${fondoHeroe})`,
            backgroundSize: "cover",
            alignItems: "center",
            backgroundRepeat: "no-repeat",
            height: dimensions.height + "px",
          }}
        >
          <Login setLogueado={setLogueado} />
        </MySection>
      ) : (
        <MySection
          style={{
            alignItems: "stretch",
            height: dimensions.outerHeight + "px",
            position: "fixed",
            bottom: 0,
            top: 0,
            right: 0,
            left: 0,
            overflow: "auto",
          }}
        >
          <Home />
        </MySection>
      )}
      <MySection
        style={{
          backgroundColor: "black",
          color: "white",
          borderTop: "3px solid gray",
          padding: "0.5rem",
          position: "fixed",
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
          zIndex: "2",
        }}
      >
        <p
          style={{
            fontFamily: "'Teko', sans-serif",
            alignSelf: "center",
            justifySelf: "center",
            margin: "auto",
          }}
        >
          By Codereggs
        </p>
      </MySection>
    </div>
  );
}

export default App;
