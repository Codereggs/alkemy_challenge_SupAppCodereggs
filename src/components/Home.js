import React, { useState } from "react";
import {
  CardGroup,
  Col,
  Container,
  Row,
  ListGroup,
  Image,
} from "react-bootstrap";
import Search from "./Search";
import SuperHeroSearchCard from "./SuperHeroSearchCard";
import Supers from "../assets/marvelpowerstats.gif";

export default function Home() {
  const [BD, setBD] = useState([]);
  const [buenos, setBuenos] = useState(0);
  const [malos, setMalos] = useState(0);

  const createData = (data) => {
    let datosBD = BD.filter((el) => el.id === data.id);
    if (datosBD.length > 0) {
      if (datosBD[0].id === data.id)
        return alert("Este heroe está repetido por favor elige otro.");
    }
    if (BD.length > 5 || BD.length < 0) return;

    if (data.tendencia === "good") {
      if (buenos > 2) return alert("Ya hay muchos buenos.");
      setBuenos(buenos + 1);
    }
    if (data.tendencia === "bad") {
      if (malos > 2) return alert("Ya hay muchos malos.");
      setMalos(malos + 1);
    }

    setBD([...BD, data]);
  };

  let suma = {
    inteligencia: 0,
    fuerza: 0,
    velocidad: 0,
    durabilidad: 0,
    poder: 0,
    combate: 0,
  };
  for (let i in BD) {
    if (BD[i].inteligencia === "null") BD[i].inteligencia = 0;
    suma.inteligencia += parseInt(BD[i].inteligencia, 10);
    if (BD[i].fuerza === "null") BD[i].fuerza = 0;
    suma.fuerza += parseInt(BD[i].fuerza, 10);
    if (BD[i].velocidad === "null") BD[i].velocidad = 0;
    suma.velocidad += parseInt(BD[i].velocidad, 10);
    if (BD[i].durabilidad === "null") BD[i].durabilidad = 0;
    suma.durabilidad += parseInt(BD[i].durabilidad, 10);
    if (BD[i].poder === "null") BD[i].poder = 0;
    suma.poder += parseInt(BD[i].poder, 10);
    if (BD[i].combate === "null") BD[i].combate = 0;
    suma.combate += parseInt(BD[i].combate, 10);
  }

  let powerstatsFinal = Object.entries(suma)
    .sort(function (a, b) {
      return a[1] - b[1];
    })
    .reverse();
  powerstatsFinal.map(
    (el) =>
      (el[0] =
        el[0].replace(/(\w)(\w*)/g, function (g0, g1, g2) {
          return g1.toUpperCase() + g2.toLowerCase();
        }) + ": ")
  );

  const borrarData = (id) => {
    let newData = BD.filter((el) => el.id !== id);
    let data = BD.filter((el) => el.id === id);
    if (data[0].tendencia === "good") setBuenos(buenos - 1);
    if (data[0].tendencia === "bad") setMalos(malos - 1);
    setBD(newData);
  };

  return (
    <Container>
      <h2
        className="fw-bold"
        style={{
          alignSelf: "center",
          justifySelf: "center",
          margin: "1rem",
          fontFamily: "'Teko', sans-serif",
          fontSize: "4rem",
        }}
      >
        Team SuperHero
      </h2>
      <hr />
      <style type="text/css">
        {`
    .miContainer-fluid {
      background-color: #4d4d4d;
      color: white;
      height: fit-content;
    }
    .miContainer-fluid .row {
      border: 1px solid black;
    }
       .borderP {
        border: none;
        
    }

    `}
      </style>
      <Container bsPrefix="miContainer" fluid rounded>
        <Row>
          <Col xs={6} lg={9} style={{ display: "flex" }}>
            <Image
              src={Supers}
              rounded
              style={{
                width: "100%",
                height: "auto",
                alignSelf: "center",
                justifySelf: "center",
              }}
            />
          </Col>
          <Col
            xs={6}
            lg={3}
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: " center",
              alignContent: "stretch",
            }}
          >
            <ListGroup
              variant="flush"
              className="bg-darky text-white "
              style={{
                width: "100%",
                fontFamily: "'Teko', sans-serif",
                fontSize: "2rem",
              }}
            >
              <ListGroup.Item
                bsPrefix="borderP"
                className="bg-darky text-white tw-bold "
              >
                POWERSTATS:
              </ListGroup.Item>
              <ListGroup.Item
                bsPrefix="borderP"
                className="bg-darky text-white "
              >
                {powerstatsFinal[0]}
              </ListGroup.Item>
              <ListGroup.Item
                bsPrefix="borderP"
                className="bg-darky text-white "
              >
                {powerstatsFinal[1]}
              </ListGroup.Item>
              <ListGroup.Item
                bsPrefix="borderP"
                className="bg-darky text-white "
              >
                {powerstatsFinal[2]}
              </ListGroup.Item>
              <ListGroup.Item
                bsPrefix="borderP"
                className="bg-darky text-white "
              >
                {powerstatsFinal[3]}
              </ListGroup.Item>
              <ListGroup.Item
                bsPrefix="borderP"
                className="bg-darky text-white "
              >
                {powerstatsFinal[4]}
              </ListGroup.Item>
              <ListGroup.Item
                bsPrefix="borderP"
                className="bg-darky text-white "
              >
                {powerstatsFinal[5]}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <Container className="text-center">
        <CardGroup>
          {BD !== null
            ? BD.map((el) => {
                return (
                  <SuperHeroSearchCard
                    key={el.id}
                    id={el.id}
                    imagen={el.imagen}
                    inteligencia={el.inteligencia}
                    fuerza={el.fuerza}
                    velocidad={el.velocidad}
                    durabilidad={el.durabilidad}
                    poder={el.poder}
                    combate={el.combate}
                    peso={el.peso}
                    altura={el.altura}
                    nombre={el.nombre}
                    nombreCompleto={el.nombreCompleto}
                    alias={el.alias}
                    color_de_ojos={el.color_de_ojos}
                    color_de_cabello={el.color_de_cabello}
                    lugar_de_trabajo={el.lugar_de_trabajo}
                    setBD={setBD}
                    elegido={true}
                    borrarData={borrarData}
                    tendencia={el.tendencia}
                  />
                );
              })
            : null}
        </CardGroup>
      </Container>
      <Container style={{ marginBottom: "2rem" }}>
        <Search setBD={createData} borrarData={borrarData} />
      </Container>
      <br />
      <br />
    </Container>
  );
}
