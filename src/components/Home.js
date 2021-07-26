import React, { useEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";
import SuperHeroCard from "./SuperHeroCard";

export default function Home() {
  const [idHeroe, setIdHeroe] = useState(0);
  const [arrElementos, setArrElementos] = useState([]);
  const [cantidad, setCantidad] = useState(2);
  const [eliminarHeroe, setEliminarHeroe] = useState(null);

  const manejador = (data) => {
    setIdHeroe(data);
  };

  const seEliminaHeroe = async (bool) => {
    if (cantidad <= 2) return setEliminarHeroe(null);
    console.log(cantidad);
    setEliminarHeroe(bool);
    return setCantidad(cantidad - 1);
  };
  /* for (let i = 0; i < cantidad; i++) {
          arrayAux.push(<SuperHeroCard id={idHeroe + i} estado={manejador} />)
        } */

  useEffect(() => {
    let arrayAux = arrElementos;
    if (eliminarHeroe) {
      setEliminarHeroe(null);
      return arrElementos.pop();
    }

    if (arrayAux.length <= 5) {
      arrayAux.push(
        <SuperHeroCard
          id={idHeroe + cantidad}
          key={idHeroe + cantidad}
          estado={manejador}
          aumentar={aumentarCantidad}
          disminuir={seEliminaHeroe}
        />
      );
      setArrElementos((elementos) => [...arrayAux]);
    }
  }, [cantidad]);

  async function aumentarCantidad() {
    if (cantidad > 6) return null;
    setCantidad(cantidad + 1);
  }
  console.log(arrElementos);
  console.log(cantidad);

  return (
    <div>
      <h3>Team SuperHero</h3>
      <hr />
      <CardGroup>
        {arrElementos.map((el) => {
          return el;
        })}

        <button onClick={seEliminaHeroe}>Disminuir Cantidad</button>
        <button onClick={aumentarCantidad}>Aumentar Cantidad</button>
      </CardGroup>
    </div>
  );
}
