import React from "react";
import { useFormik } from "formik";
const axios = require("axios");

const Login = () => {
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Campo vacío.";
    } else if (
      !/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/gi.test(
        values.email
      )
    ) {
      errors.email = "Escribe una dirección de email válida.";
    }

    if (!values.password) {
      errors.password = "Campo vacío.";
    } else if (values.password.length > 20) {
      errors.password = "No debe exceder los 20 carácteres.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      let url = "http://challenge-react.alkemy.org";

      const postUser = async (url) => {
        try {
          const datosEnviados = await axios({
              method: "post",
              url: url,
              data: values,
            }),
            json = await datosEnviados.data;
          window.localStorage.setItem("token", JSON.stringify(json.token));
        } catch (err) {
          alert(err + " Por favor intente de nuevo con los datos correctos.");
        }
      };

      postUser(url);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      <label htmlFor="pass">Password</label>
      <input
        id="pass"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password ? <div>{formik.errors.password}</div> : null}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
