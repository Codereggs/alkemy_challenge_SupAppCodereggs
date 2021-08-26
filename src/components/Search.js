import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import SuperHeroSearchCard from "./SuperHeroSearchCard";
import { Alert, DropdownButton, Form, Row } from "react-bootstrap";
import { getData, searchHero } from "../helpers/useAxios";
import { Loader } from "./Loader";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const Search = ({ setBD, borrarData }) => {
  const [supersEncontrados, setSupersEncontrados] = useState([]);
  const [searching, setSearching] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setSearching(values);
    },
  });
  useEffect(() => {
    if (searching === null) return;

    const getAxiosData = async () => {
      let urlHero =
        "https://superheroapi.com/api.php/10159182639604457/search/" +
        searching.search;
      setLoading(true);
      const [resData] = await Promise.all([getData(urlHero)]);
      if (resData.status < 200 || resData.status > 299) return alert(resData);
      let superHeroes = [resData.results];
      setSupersEncontrados(...superHeroes);
      setSearching(null);
      setLoading(false);
    };

    getAxiosData();
  }, [searching]);

  const HandleChange = (e) => {
    var characterCount = e.target.value.length;

    if (characterCount < 3) {
    }
    setSupersEncontrados([]);

    if (characterCount >= 3) {
      setLoading(true);
      (async () => {
        const respHero = await searchHero(e.target.value);
        console.log(respHero);
        setSupersEncontrados(respHero.results);
        setLoading(false);
      })();
    }
  };
  const HandleMouseDown = (hero) => {
    setBD({
      id: hero.id,
      imagen: hero.image.url,
      inteligencia: hero.powerstats.intelligence,
      fuerza: hero.powerstats.strength,
      velocidad: hero.powerstats.speed,
      durabilidad: hero.powerstats.durability,
      poder: hero.powerstats.power,
      combate: hero.powerstats.combat,
      peso: hero.appearance.weight[1],
      altura: hero.appearance.height[1],
      nombre: hero.name,
      nombreCompleto: hero.biography.fullName,
      alias: hero.biography.aliases,
      color_de_ojos: hero.appearance.eyeColor,
      color_de_cabello: hero.appearance.hairColor,
      lugar_de_trabajo: hero.work.base,
      tendencia: hero.biography.alignment,
    });
  };
  return (
    <>
      <div className="Inicio">
        <Form
          onSubmit={formik.handleSubmit}
          style={{ margin: "1.5rem" }}
          className="miForm"
        >
          <Form.Label htmlFor="search" className="fw-bold label-img">
            Encuentra tu Héroe
          </Form.Label>
          <Form.Control
            id="search"
            name="search"
            type="text"
            onChange={(e) => {
              formik.handleChange(e);
              HandleChange(e);
            }}
            value={formik.values.search}
          />
          <DropdownButton
            id="dropdown-basic-button"
            title="Selecciona tu héroe"
            style={{ margin: "auto", width: "100%" }}
          >
            <div>
              {supersEncontrados ===
              undefined ? null : supersEncontrados.length > 0 ? (
                supersEncontrados.map((hero) => (
                  <DropdownItem
                    key={hero.id}
                    action
                    onMouseDown={() => HandleMouseDown(hero)}
                  >
                    {hero.name}&nbsp;
                    <span className="badge badge-pill bg-secondary">
                      {hero.biography.alignment}
                    </span>
                  </DropdownItem>
                ))
              ) : (
                <div>No existen resultados.</div>
              )}
            </div>
          </DropdownButton>
          {formik.errors.search ? (
            <Alert variant="danger" style={{ padding: "0.2rem" }}>
              {formik.errors.search}
            </Alert>
          ) : null}
          {loading && <Loader />}
          {/*   {loading ? (
            <Loader />
          ) : (
            <Button
              type="submit"
              variant="dark"
              className="rounded btn-buscar-heroe"
            >
              Buscar
            </Button>
          )} */}
        </Form>
      </div>
      <Row
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
        ) : null}
      </Row>
    </>
  );
};

export default Search;
