import React from "react";
import { Card } from "react-bootstrap";

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
    <div ref={refDetalles} className="none">
      <Card.Text>
        {nombre === undefined ? "No tiene nombre." : "Nombre: " + nombre}
      </Card.Text>
      <Card.Text>
        {" "}
        {alias === undefined ? "No tiene alias." : "Alias: " + alias}
      </Card.Text>
      <Card.Text>
        {peso === undefined ? "No tiene peso." : "Peso: " + peso}
      </Card.Text>
      <Card.Text>
        {" "}
        {altura === undefined ? "No tiene altura." : "Altura: " + altura}
      </Card.Text>
      <Card.Text>
        {" "}
        {colorDeOjos === undefined
          ? "No está definido color de ojos."
          : "Color de ojos: " + colorDeOjos}
      </Card.Text>
      <Card.Text>
        {" "}
        {colorDeCabello === undefined
          ? "No está definido color de cabello."
          : "Color de cabello: " + colorDeCabello}
      </Card.Text>
      <Card.Text>
        {lugarDeTrabajo === undefined
          ? "No tiene lugar de trabajo."
          : "Lugar de trabajo: " + lugarDeTrabajo}
      </Card.Text>
    </div>
  );
}
