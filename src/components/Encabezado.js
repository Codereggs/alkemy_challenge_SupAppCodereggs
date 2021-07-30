import React from "react";
import { Card } from "react-bootstrap";

export default function Encabezado({ nombre, urlImg }) {
  return (
    <>
      <Card.Title>{nombre}</Card.Title>
      <Card.Img variant="top" src={urlImg} className="imgCard" />
    </>
  );
}
