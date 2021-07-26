import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useAxios } from "../hooks/useAxios";
import CartaHeroe from "./CartaHeroe";
import DetallesHeroes from "./DetallesHeroe";
import Encabezado from "./Encabezado";
import Poderes from "./Poderes";

export default function SuperHeroCard({ id, estado, aumentar, disminuir }) {
  const [idHeroe, setIdHeroe] = useState(0);
  const [idCard, setidCard] = useState({ id });

  let url = "https://superheroapi.com/api/10159182639604457/" + idHeroe;

  let { data, powerstats, details } = useAxios(url, idCard.id);

  let refBtnDetalles = useRef(),
    refCard = useRef(),
    refEliminar = useRef(),
    refDetalles = useRef();

  useEffect(() => {
    let idVar = idCard.id;
    window.localStorage.setItem("idHeroe" + idVar, idHeroe);
    window.localStorage.setItem("CaHe" + idVar, "false");
  }, [idHeroe, idCard]);

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
            <Container>
              <Row>
                <Col>
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
                </Col>
                <Col>
                  {details.lenght === 0 ? (
                    <h3>Cargando Detalles...</h3>
                  ) : (
                    details.map((el) => (
                      <DetallesHeroes
                        refDetalles={refDetalles}
                        peso={el.peso}
                        altura={el.altura}
                        nombre={el.nombre}
                        alias={el.alias}
                        colorDeOjos={el.color_de_ojos}
                        colorDeCabello={el.color_de_cabello}
                        lugarDeTrabajo={el.lugar_de_trabajo}
                      />
                    ))
                  )}
                </Col>
              </Row>
            </Container>
            <Button
              id={id}
              variant="primary"
              onClick={handleToggleCard}
              ref={refBtnDetalles}
            >
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
    setIdHeroe(input);
    return aumentar();
  }

  function eliminarHeroe() {
    setIdHeroe(0);
    disminuir(true);
  }

  function handleToggleCard(e) {
    if (refBtnDetalles.current.textContent === "Detalles") {
      refCard.current.classList.toggle("modal-on");
      refBtnDetalles.current.textContent = "Salir";
      refEliminar.current.classList.add("none");
      refDetalles.current.classList.remove("none");
    } else {
      refCard.current.classList.toggle("modal-on");
      refBtnDetalles.current.textContent = "Detalles";
      refEliminar.current.classList.remove("none");
      refDetalles.current.classList.add("none");
    }
  }
}
