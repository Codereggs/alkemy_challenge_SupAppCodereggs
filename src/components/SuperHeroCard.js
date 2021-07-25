import React, { useState, useRef, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useAxios } from "../hooks/useAxios";
import CartaHeroe from "./CartaHeroe";
import Encabezado from "./Encabezado";
import Poderes from "./Poderes";



export default function SuperHeroCard({ id, estado, aumentar }) {
  const [idHeroe, setIdHeroe] = useState(0);
  const [idCard, setidCard] = useState({ id });


  let url = "https://superheroapi.com/api/10159182639604457/" + idHeroe;

  let { data, powerstats, details } = useAxios(url, idCard.id);

  let refBtnDetalles = useRef(),
    refCard = useRef(),
    refEliminar = useRef();

  useEffect(() => {
    let idVar = idCard.id;
    window.localStorage.setItem("idHeroe" + idVar, idHeroe)
    window.localStorage.setItem("CaHe" + idVar, "false")
  }, [idHeroe, idCard])

  return (
    <>
      {idHeroe !== 0 ? (
        <Card style={{ width: "5rem" }} ref={refCard}>
          <Card.Body>
            {!data ? (
              <h3>Cargando...</h3>
            ) : (
              <Encabezado nombre={data.name} urlImg={data.image.url} />
            )}

            {powerstats.length === 0 ? (
              <h3>Cargando...</h3>
            ) : (
              powerstats.map((el) => (
                <Poderes
                  key={data.id + 1}
                  inteligencia={el.inteligencia}
                  fuerza={el.fuerza}
                  velocidad={el.velocidad}
                  durabilidad={el.durabilidad}
                  poder={el.poder}
                  combate={el.combate}
                />
              ))
            )}
            <Button id={id} variant="primary" onClick={handleToggleCard} ref={refBtnDetalles}>
              Detalles
            </Button>
            <Button variant="danger" onClick={eliminarHeroe} ref={refEliminar}>
              Eliminar
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card style={{ width: "18rem" }} id="" border="secondary">
          <Card.Body>
            <CartaHeroe id={id} />
            <Button
              variant="primary"
              id={"btn" + id}
              onClick={function () {
                aumentar()
                let $input = document.querySelector("#inputHeroe" + id);
                $input = $input.value;
                if ($input === "" || $input === undefined) return true;
                return elegirHeroe($input);
              }}
            >
              Aceptar
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );

  function elegirHeroe(input) {
    return setIdHeroe(input);
  }

  function eliminarHeroe() {
    setIdHeroe(0);
  }

  function handleToggleCard(e) {
    if (refBtnDetalles.current.textContent === "Detalles") {
      refCard.current.classList.toggle("modal-on");
      refBtnDetalles.current.textContent = "Salir";
      refEliminar.current.classList.add("none");

    } else {
      refCard.current.classList.toggle("modal-on");
      refBtnDetalles.current.textContent = "Detalles";
      refEliminar.current.classList.remove("none");
    }
    /* if (refMenuBtn.current.textContent === "Menú") {
      refMenuBtn.current.textContent = "Cerrar";
      refMenu.current.style.display = "block";
    } else {
      refMenuBtn.current.textContent = "Menú";
      refMenu.current.style.display = "none";
    } */
  }
}
