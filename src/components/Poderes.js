import React from "react";
import { Col, ListGroup } from "react-bootstrap";

export default function Poderes({
  inteligencia,
  fuerza,
  velocidad,
  durabilidad,
  poder,
  combate,
  refPoderes,
}) {
  return (
    <>
      <style type="text/css">
        {`
    .font-bold {
      font-weight: bold;
     
    }
    `}
      </style>
      <Col className="bg-dark " ref={refPoderes}>
        <ListGroup variant="flush" className="bg-dark text-white grupoLista">
          <ListGroup.Item className="font-bold bg-dark text-white">
            - Poderes -
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white ">
            Inteligencia: {inteligencia}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white ">
            Fuerza: {fuerza}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white ">
            Velocidad: {velocidad}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white ">
            Durabilidad: {durabilidad}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white ">
            Poder: {poder}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white ">
            Combate: {combate}
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </>
  );
}
