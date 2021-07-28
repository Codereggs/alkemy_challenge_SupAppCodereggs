import React, { useState } from "react";
import { CardGroup } from "react-bootstrap";
import Search from "./Search";
import SuperHeroSearchCard from "./SuperHeroSearchCard";

export default function Home() {
  const [cantidad, setCantidad] = useState(0);
  const [BD, setBD] = useState([]);
  const [buenos, setBuenos] = useState(0);
  const [malos, setMalos] = useState(0);

  console.log(buenos, malos);
  const createData = (data) => {
    let datosBD = BD.filter((el) => el.id === data.id);
    if (datosBD.length > 0) {
      if (datosBD[0].id === data.id)
        return alert("Este heroe está repetido por favor elige otro.");
    }
    if (BD.length > 5 || BD.length < 0) return;

    if (data.tendencia === "good") {
      if (buenos > 2) return alert("Ya hay muchos buenos.");
      setBuenos(buenos + 1);
    }
    if (data.tendencia === "bad") {
      if (malos > 2) return alert("Ya hay muchos malos.");
      setMalos(malos + 1);
    }

    setBD([...BD, data]);
  };

  const borrarData = (id) => {
    let newData = BD.filter((el) => el.id !== id);
    let data = BD.filter((el) => el.id === id);
    if (data[0].tendencia === "good") setBuenos(buenos - 1);
    if (data[0].tendencia === "bad") setMalos(malos - 1);
    setBD(newData);
  };

  return (
    <div>
      <h3>Team SuperHero</h3>
      <hr />
      <CardGroup>
        {BD !== null
          ? BD.map((el) => {
              return (
                <SuperHeroSearchCard
                  key={el.id}
                  id={el.id}
                  imagen={el.imagen}
                  inteligencia={el.inteligencia}
                  fuerza={el.fuerza}
                  velocidad={el.velocidad}
                  durabilidad={el.durabilidad}
                  poder={el.poder}
                  combate={el.combate}
                  peso={el.peso}
                  altura={el.altura}
                  nombre={el.nombre}
                  nombreCompleto={el.nombreCompleto}
                  alias={el.alias}
                  color_de_ojos={el.color_de_ojos}
                  color_de_cabello={el.color_de_cabello}
                  lugar_de_trabajo={el.lugar_de_trabajo}
                  setBD={setBD}
                  elegido={true}
                  borrarData={borrarData}
                  tendencia={el.tendencia}
                />
              );
            })
          : null}
      </CardGroup>
      <Search id={cantidad + 1} setBD={createData} borrarData={borrarData} />
    </div>
  );
}

/* let arrayAux = [];

   const disminuirCantidad = (e) => {
       if (cantidad <= 2) return true; 
     arrayAux = arrElementos;
    arrayAux.splice(e.id);
    setArrElementos(arrayAux);
    setCantidad(cantidad - 1);
    console.log(arrElementos, e.id, cantidad);
  }; 

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

  if (arrElementos.length === 0) {
    setArrElementos([
      <SuperHeroCard
        id={cantidad + 1}
        key={cantidad + 1}
        aumentar={aumentarCantidad}
        disminuir={null}
      />,
    ]);
    setCantidad(cantidad + 1);
  } 
 */
