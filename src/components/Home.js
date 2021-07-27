import React, { useEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";
import SuperHeroCard from "./SuperHeroCard";
import Search from "./Search";

export default function Home() {
  const [cantidad, setCantidad] = useState(0);
  const [arrElementos, setArrElementos] = useState([]);
  let arrayAux = [];

  /*   const disminuirCantidad = (e) => {
       if (cantidad <= 2) return true; 
     arrayAux = arrElementos;
    arrayAux.splice(e.id);
    setArrElementos(arrayAux);
    setCantidad(cantidad - 1);
    console.log(arrElementos, e.id, cantidad);
  }; */

  const aumentarCantidad = (e) => {
    arrayAux = arrElementos;
    if (cantidad > 5) return null;

    //Ficha de heroe
    if (arrayAux.length <= 5) {
      arrayAux.push(
        <SuperHeroCard
          id={cantidad + 1}
          key={cantidad + 1}
          aumentar={aumentarCantidad}
          disminuir={null}
        />
      );
    }
    setArrElementos((arrElementos) => [...arrayAux]);
    //Cantidad
    setCantidad(cantidad + 1);
  };

  useEffect(() => {
    console.log(cantidad);
    console.log(arrElementos);
    console.log(arrElementos.length === 0);
  }, [cantidad]);

  /* if (arrElementos.length === 0) {
    setArrElementos([
      <SuperHeroCard
        id={cantidad + 1}
        key={cantidad + 1}
        aumentar={aumentarCantidad}
        disminuir={null}
      />,
    ]);
    setCantidad(cantidad + 1);
  } */
  let card = {
    carta: (
      <SuperHeroCard
        id={cantidad + 1}
        key={cantidad + 1}
        aumentar={aumentarCantidad}
        disminuir={null}
      />
    ),
    pato: 2,
    carro: 3,
  };

  return (
    <div>
      <h3>Team SuperHero</h3>
      <hr />
      <CardGroup>
        {
          console.log(arrElementos)
          /* arrElementos.map((el) => {
          return el;
        }) */
        }

        <button>Disminuir Cantidad</button>
        <button>Aumentar Cantidad</button>
      </CardGroup>
      <Search id={cantidad + 1} />
    </div>
  );
}
