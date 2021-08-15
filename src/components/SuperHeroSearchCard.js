import React, { useRef, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
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
    refDetalles = useRef(),
    refDeleteBtn = useRef(),
    refElegir = useRef(),
    refPoderes = useRef(),
    refRowDetalles = useRef();

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
  useEffect(() => {
    if (elegido) {
      refCard.current.classList.add("cardElegida");
      refRowDetalles.current.classList.remove("none");
    }
    if (window.innerWidth < 500) {
      refDetalles.current.classList.remove("none");
      refRowDetalles.current.classList.remove("none");
    }
  });

  return (
    <>
      <Col
        xs={6}
        sm={4}
        lg={2}
        xl={2}
        style={{ backgroundColor: "inherit" }}
        className="col-cards"
      >
        <Card
          style={{}}
          className="border border-dark bg-dark text-white shadow carta-heroe flip-card"
          ref={refCard}
        >
          <div className="flip-card-inner div-card-heroe">
            <Card.Body className={"flip-card-front"}>
              <Encabezado nombre={nombre} urlImg={imagen} />
              <Button
                id={id + 5000}
                variant="primary"
                onClick={handleToggleCard}
                ref={refBtnDetalles}
                className="btn-hero-detalles"
              >
                Detalles
              </Button>
              {!elegido ? (
                <Button
                  id={id + 4000}
                  variant="secondary"
                  onClick={datosHandler}
                  ref={refElegir}
                >
                  Elegir
                </Button>
              ) : null}
              {elegido ? (
                <Button
                  ref={refDeleteBtn}
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
            <Container fluid className="flip-card-back">
              <Row ref={refRowDetalles} className="none">
                {elegido ? (
                  <Poderes
                    key={id}
                    inteligencia={inteligencia}
                    fuerza={fuerza}
                    velocidad={velocidad}
                    durabilidad={durabilidad}
                    poder={poder}
                    combate={combate}
                    refPoderes={refPoderes}
                  />
                ) : (
                  <hr />
                )}

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
              </Row>
            </Container>
          </div>
        </Card>
      </Col>
    </>
  );

  function handleToggleCard() {
    if (refBtnDetalles.current.textContent === "Detalles") {
      refRowDetalles.current.classList.remove("none");
      refCard.current.classList.toggle("modal-on");
      refBtnDetalles.current.textContent = "Salir";
      refDetalles.current.classList.remove("none");
      refDetalles.current.classList.add("border", "border-primary");
      if (elegido) refPoderes.current.classList.add("border", "border-primary");
    } else {
      refCard.current.classList.toggle("modal-on");
      refBtnDetalles.current.textContent = "Detalles";
      refDetalles.current.classList.add("none");
      refDetalles.current.classList.remove("border", "border-primary");
      if (elegido) {
        refPoderes.current.classList.remove("border", "border-primary");
      } else if (!elegido) {
        refRowDetalles.current.classList.add("none");
      }
    }
  }
}
