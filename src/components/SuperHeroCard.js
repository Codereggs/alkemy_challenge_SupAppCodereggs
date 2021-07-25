import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useAxios } from "../hooks/useAxios";
import CartaHeroe from "./CartaHeroe";
import Poderes from "./Poderes";

function Encabezado({ nombre, urlImg }) {
  return (
    <>
      <Card.Title>{nombre}</Card.Title>
      <Card.Img variant="top" src={urlImg} />
    </>
  );
}

export default function SuperHeroCard({ id }) {
  const [idHeroe, setIdHeroe] = useState(0);

  let url = "https://superheroapi.com/api/10159182639604457/" + idHeroe;

  let { data, powerstats, details } = useAxios(url);

  return (
    <>
      {idHeroe !== 0 ? (
        <Card style={{ width: "5rem" }}>
          <Card.Body>
            {!data ? (
              <h3>Cargando...</h3>
            ) : (
              <Encabezado nombre={data.name} urlImg={data.image.url} />
            )}

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
            <Button variant="primary" onClick={verDetalles}>
              Detalles
            </Button>
            <Button variant="danger" onClick={eliminarHeroe}>
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
              onClick={function () {
                let $input = document.querySelector("#inputHeroe" + id);
                $input = $input.value;
                console.log($input);
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
    return setIdHeroe(input);
  }

  function eliminarHeroe() {
    setIdHeroe(0);
    console.log(idHeroe);
  }

  function verDetalles() {
    alert("click");
  }
}
