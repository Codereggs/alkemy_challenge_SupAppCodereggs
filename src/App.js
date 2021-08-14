import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import fondoHeroe from "./assets/1354.jpg";
import { useState, useEffect } from "react";
import { postUser } from "./helpers/useAxios";
import { ErrMessage } from "./components/ErrMessage";
import registro from "./assets/registro.svg";

function App() {
  const [logueado, setLogueado] = useState(false);
  const [logueando, setLogueando] = useState(null);
  const [showErr, setShowErr] = useState(null);

  useEffect(() => {
    if (logueando === null) return;
    const axiosData = async () => {
      let url;

      if (logueando.email.toUpperCase() === "CHALLENGE@ALKEMY.ORG")
        url = "//challenge-react.alkemy.org";
      else {
        url = "//user-register-api.herokuapp.com/";
      }

      const [resData] = await Promise.all([postUser(url, logueando)]);
      if (resData.status < 200 || resData.status > 299)
        return [setShowErr(resData)];
      setLogueado(true);
    };

    axiosData();
  }, [logueando]);

  //Eliminar el token
  window.onbeforeunload = () => {
    window.localStorage.removeItem("token");
    setLogueado(false);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      {logueado === false ? (
        <section
          className="app-sections"
          key={1}
          style={{
            backgroundImage: `url(${fondoHeroe})`,
            backgroundSize: "cover",
            alignItems: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}
        >
          <div className="log-in">
            <a href="#" className="link-log-in">
              {/*Quedamos en meter el boton del login y luego una ventana modal con un formulario de registro*/}
              <img src={registro} alt="registro" className="img-log-in"></img>
              Registrarse
            </a>
          </div>
          {showErr ? (
            <ErrMessage
              smsg={showErr.status}
              msg={showErr.data.error}
              setShow={setShowErr}
            />
          ) : null}
          <Login setLogueando={setLogueando} />
        </section>
      ) : (
        <section className="app-sections" key={2}>
          <Home />
        </section>
      )}
      <section
        className="app-sections"
        key={3}
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
          width: "100%",
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
      </section>
    </div>
  );
}

export default App;
