import React, { useState } from "react";
import { useFormik } from "formik";
const axios = require("axios");

const Search = () => {
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
          console.log(supersEncontrados);
        } catch (err) {
          alert(err + " Por favor intente de nuevo con los datos correctos.");
        }
      };

      getSearch(url);
    },
  });

  return (
    <div className="Inicio">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
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
        <button type="submit">Submit</button>
        {console.log(supersEncontrados)}
      </form>
    </div>
  );
};

export default Search;
