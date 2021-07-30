import React from "react";
import { Col, ListGroup } from "react-bootstrap";

export default function DetallesHeroes({
  peso,
  altura,
  nombre,
  alias,
  colorDeOjos,
  colorDeCabello,
  lugarDeTrabajo,
  refDetalles,
}) {
  return (
    <>
      <Col className=" none" ref={refDetalles}>
        <ListGroup variant="flush">
          <ListGroup.Item className="font-bold text-white bg-dark">
            - Detalles -
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            {nombre === undefined ? "No tiene nombre." : "Nombre: " + nombre}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            {" "}
            {alias === undefined ? "No tiene alias." : "Alias: " + alias}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            {peso === undefined ? "No tiene peso." : "Peso: " + peso}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            {" "}
            {altura === undefined ? "No tiene altura." : "Altura: " + altura}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            {" "}
            {colorDeOjos === undefined
              ? "No está definido color de ojos."
              : "Color de ojos: " + colorDeOjos}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            {" "}
            {colorDeCabello === undefined
              ? "No está definido color de cabello."
              : "Color de cabello: " + colorDeCabello}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            {lugarDeTrabajo === undefined
              ? "No tiene lugar de trabajo."
              : "Lugar de trabajo: " + lugarDeTrabajo}
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </>
  );
}
