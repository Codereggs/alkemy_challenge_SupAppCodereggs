import React, { useState } from "react";
import { useFormik } from "formik";
import SuperHeroSearchCard from "./SuperHeroSearchCard";
import { Alert, Button, Row, Form } from "react-bootstrap";
const axios = require("axios");

const Search = ({ setBD, borrarData }) => {
  const [supersEncontrados, setSupersEncontrados] = useState([]);

  const validate = (values) => {
    const errors = {};
    if (!values.search) {
      errors.search = "Campo vacío.";
    } else if (!/^[A-Za-z0-9\s]+$/gi.test(values.search)) {
      errors.search = "Este campo solo acepta letras y espacios en blanco.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      search: "",
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
        <Form
          onSubmit={formik.handleSubmit}
          style={{ margin: "1.5rem" }}
          className="miForm"
        >
          <Form.Label htmlFor="search" className="fw-bold">
            Buscar Héroe
          </Form.Label>
          <Form.Control
            id="search"
            name="search"
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.search}
          />
          {formik.errors.search ? (
            <Alert variant="danger" style={{ padding: "0.2rem" }}>
              {formik.errors.search}
            </Alert>
          ) : null}
          <Button type="submit" variant="dark" style={{ marginTop: "1rem" }}>
            Buscar
          </Button>
        </Form>
      </div>
      <Row
        xs="auto"
        className="text-center"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {supersEncontrados === undefined ? (
          <Alert variant="danger">
            El héroe que estás buscando no existe. Por favor busca otro.
          </Alert>
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
          <Alert
            variant="success"
            style={{
              alignSelf: "center",
              justifySelf: "center",
              marginBottom: "1rem",
            }}
          >
            Hola, busca un héroe.
          </Alert>
        )}
      </Row>
    </>
  );
};

export default Search;
