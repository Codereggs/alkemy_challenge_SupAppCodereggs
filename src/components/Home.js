import React, { useEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";
import SuperHeroCard from "./SuperHeroCard";



export default function Home() {

  const [idHeroe, setIdHeroe] = useState(1);
  const [arrElementos, setArrElementos] = useState([]);
  const [cantidad, setCantidad] = useState(1);

  const manejador = (data) => {
    setIdHeroe(data)
  };
  /* for (let i = 0; i < cantidad; i++) {
          arrayAux.push(<SuperHeroCard id={idHeroe + i} estado={manejador} />)
        } */

  useEffect(() => {
    let arrayAux = arrElementos;
    if (arrayAux.length <= 5) {
      arrayAux.push(<SuperHeroCard id={idHeroe} estado={manejador} aumentar={aumentarCantidad} />);
      setArrElementos((elementos) => [...arrayAux])
    }

  }, [cantidad])

  function aumentarCantidad() {
    setCantidad(cantidad + 1);
  }
  console.log(arrElementos);

  return (
    <div>
      <h3>Team SuperHero</h3>
      <hr />
      <CardGroup>

        {arrElementos.length === 0 ? <SuperHeroCard id={idHeroe} estado={manejador} aumentar={aumentarCantidad} /> : arrElementos.map((el) => {
          return el
        })}
        <button onClick={aumentarCantidad} >Aumentar Cantidad</button>





      </CardGroup>
    </div>
  )
}
