import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import fondoHeroe from "./assets/1354.jpg";
import { useState, useEffect } from "react";
import { postRegistration, postUser } from "./helpers/useAxios";
import { ErrMessage } from "./components/ErrMessage";
import registro from "./assets/registro.svg";
import { ModalSignIn } from "./components/ModalSignIn";
import { SuccMessage } from "./components/SuccMessage";

function App() {
  const [logueado, setLogueado] = useState(false);
  const [logueando, setLogueando] = useState(null);
  const [registrando, setRegistrando] = useState(null);
  const [showErr, setShowErr] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    if (logueando === null) return;
    const axiosData = async () => {
      let url;

      if (logueando.email.toUpperCase() === "CHALLENGE@ALKEMY.ORG")
        url = "//challenge-react.alkemy.org";
      else {
        url = "https://user-register-api.herokuapp.com/login";
      }
      const [resData] = await Promise.all([postUser(url, logueando)]);
      if (!resData) return;
      if (resData.status < 200 || resData.status > 299)
        return [setShowErr(resData)];
      setLogueado(true);
      if (logueando.email.toUpperCase() === "CHALLENGE@ALKEMY.ORG")
        window.localStorage.setItem("token", resData.token);
      window.localStorage.setItem("token", resData.jwt);
    };

    axiosData();
  }, [logueando]);

  useEffect(() => {
    if (registrando === null) return;
    const axiosData = async () => {
      let url = "https://user-register-api.herokuapp.com/register";
      setLoader(true);
      const [resData] = await Promise.all([postRegistration(url, registrando)]);
      if (!resData) return;
      if (resData.status < 200 || resData.status > 299) {
        setLoader(false);
        return setShowErr(resData);
      }
      setLoader(false);
      setShowSuccess(true);
      handleClose();
    };

    axiosData();
  }, [registrando]);

  //Verificar si estoy activo o no
  useEffect(() => {
    if (window.localStorage.getItem("token")) setLogueado(true);
    else setLogueado(false);
  }, [logueado]);

  //Eliminar el token
  window.onbeforeunload = () => {
    window.localStorage.removeItem("token");
    setLogueado(false);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <ModalSignIn
        show={showModal}
        handleClose={handleClose}
        setRegistrando={setRegistrando}
        loader={loader}
      />
      {showSuccess ? (
        <SuccMessage
          smsg="Te has registrado."
          msg="Ingresa con los datos ingresados anteriormente."
          setShow={setShowSuccess}
        />
      ) : null}
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
          <div className="sign-in">
            <button onClick={handleShow} className="link-sign-in">
              {/*Quedamos en meter el boton del login y luego una ventana modal con un formulario de registro*/}
              <img
                src={registro}
                alt="registro-freepik"
                className="img-sign-in"
                rel="www.freepik.com"
              ></img>
              <span>Registrarse</span>
            </button>
          </div>
          {showErr ? (
            <ErrMessage
              smsg={showErr.status}
              msg={
                showErr.config.url ===
                  "https://user-register-api.herokuapp.com/login" ||
                showErr.config.url ===
                  "https://user-register-api.herokuapp.com/register"
                  ? showErr.data
                  : showErr.data.error
              }
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
