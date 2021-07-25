import React from "react";
import { Card } from "react-bootstrap";

export default function CartaHeroe({ id }) {
  return (
    <>
      <Card.Text>Elige tu Héroe</Card.Text>
      <div className="espacio"></div>
      <input
        id={"inputHeroe" + id}
        type="number"
        placeholder="Introduce el ID de tu héroe."
      ></input>
    </>
  );
}
