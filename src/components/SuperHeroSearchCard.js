import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import CartaHeroe from "./CartaHeroe";
import DetallesHeroes from "./DetallesHeroe";
import Encabezado from "./Encabezado";
import Poderes from "./Poderes";

export default function SuperHeroSearchCard({
  id,
  imagen,
  inteligencia,
  fuerza,
  velocidad,
  durabilidad,
  poder,
  combate,
  peso,
  altura,
  nombre,
  alias,
  color_de_ojos,
  color_de_cabello,
  lugar_de_trabajo,
  setBD,
  elegido,
  borrarData,
  tendencia,
}) {
  let refBtnDetalles = useRef(),
    refCard = useRef(),
    refDetalles = useRef();

  let data = {
    id,
    imagen,
    inteligencia,
    fuerza,
    velocidad,
    durabilidad,
    poder,
    combate,
    peso,
    altura,
    nombre,
    alias,
    color_de_ojos,
    color_de_cabello,
    lugar_de_trabajo,
    tendencia,
  };
  const datosHandler = () => {
    setBD(data);
  };
  return (
    <>
      <Card style={{ width: "5rem" }} ref={refCard}>
        <Card.Body>
          <Encabezado nombre={nombre} urlImg={imagen} />
          <Container>
            <Row>
              <Col>
                <Poderes
                  key={id}
                  inteligencia={inteligencia}
                  fuerza={fuerza}
                  velocidad={velocidad}
                  durabilidad={durabilidad}
                  poder={poder}
                  combate={combate}
                />
              </Col>
              <Col>
                <DetallesHeroes
                  refDetalles={refDetalles}
                  peso={peso}
                  altura={altura}
                  nombre={nombre}
                  alias={alias}
                  colorDeOjos={color_de_ojos}
                  colorDeCabello={color_de_cabello}
                  lugarDeTrabajo={lugar_de_trabajo}
                />
              </Col>
            </Row>
          </Container>
          <Button
            id={id + 5000}
            variant="primary"
            onClick={handleToggleCard}
            ref={refBtnDetalles}
          >
            Detalles
          </Button>
          {!elegido ? (
            <Button id={id + 4000} variant="secondary" onClick={datosHandler}>
              Elegir
            </Button>
          ) : null}
          {elegido ? (
            <Button
              id={id + 2000}
              variant="danger"
              onClick={() => {
                borrarData(id);
              }}
            >
              Borrar
            </Button>
          ) : null}
        </Card.Body>
      </Card>
    </>
  );

  function handleToggleCard() {
    if (refBtnDetalles.current.textContent === "Detalles") {
      refCard.current.classList.toggle("modal-on");
      refBtnDetalles.current.textContent = "Salir";
      refDetalles.current.classList.remove("none");
    } else {
      refCard.current.classList.toggle("modal-on");
      refBtnDetalles.current.textContent = "Detalles";
      refDetalles.current.classList.add("none");
    }
  }
}
