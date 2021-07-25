import React from "react";
import { Card } from "react-bootstrap";

export default function Poderes({
  inteligencia,
  fuerza,
  velocidad,
  durabilidad,
  poder,
  combate,
}) {
  return (
    <>
      <Card.Text>Inteligencia: {inteligencia}</Card.Text>
      <Card.Text>Fuerza: {fuerza}</Card.Text>
      <Card.Text>Velocidad: {velocidad}</Card.Text>
      <Card.Text>Durabilidad: {durabilidad}</Card.Text>
      <Card.Text>Poder: {poder}</Card.Text>
      <Card.Text>Combate: {combate}</Card.Text>
    </>
  );
}
