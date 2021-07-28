import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import SuperHeroSearchCard from "./SuperHeroSearchCard";
import { CardGroup } from "react-bootstrap";
const axios = require("axios");

const Search = ({ setBD, borrarData }) => {
  const [supersEncontrados, setSupersEncontrados] = useState([]);

  const validate = (values) => {
    const errors = {};
    if (!values.search) {
      errors.search = "Campo vacío.";
    } else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/gi.test(values.search)) {
      errors.search = "Este campo solo acepta letras y espacios en blanco.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      search: "Flash",
    },
    validate,
    onSubmit: (values) => {
      let url =
        "https://superheroapi.com/api/10159182639604457/search/" +
        values.search;

      const getSearch = async (url) => {
        try {
          const recibirDatos = await axios.get(url),
            json = await recibirDatos;
          let superHeroes = [json.data.results];
          setSupersEncontrados(...superHeroes);
          console.log(superHeroes);
        } catch (err) {
          alert(err + " Por favor intente de nuevo con los datos correctos.");
        }
      };

      getSearch(url);
    },
  });

  return (
    <>
      <div className="Inicio">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="search">Buscar Héroe</label>
          <input
            id="search"
            name="search"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.search}
          />
          {formik.errors.search ? <div>{formik.errors.search}</div> : null}
          <button type="submit">Buscar</button>
        </form>
      </div>
      <CardGroup>
        {supersEncontrados === undefined ? (
          <h4>El héroe que estás buscando no existe. Por favor busca otro.</h4>
        ) : supersEncontrados.length !== 0 ? (
          supersEncontrados.map((el) => {
            return (
              <SuperHeroSearchCard
                key={el.id}
                id={el.id}
                imagen={el.image.url}
                inteligencia={el.powerstats.intelligence}
                fuerza={el.powerstats.strength}
                velocidad={el.powerstats.speed}
                durabilidad={el.powerstats.durability}
                poder={el.powerstats.power}
                combate={el.powerstats.combat}
                peso={el.appearance.weight[1]}
                altura={el.appearance.height[1]}
                nombre={el.name}
                nombreCompleto={el.biography.fullName}
                alias={el.biography.aliases}
                color_de_ojos={el.appearance.eyeColor}
                color_de_cabello={el.appearance.hairColor}
                lugar_de_trabajo={el.work.base}
                setBD={setBD}
                elegido={false}
                borrarData={borrarData}
                tendencia={el.biography.alignment}
              />
            );
          })
        ) : (
          <h4>Busca un heroe.</h4>
        )}
      </CardGroup>
    </>
  );
};

export default Search;
