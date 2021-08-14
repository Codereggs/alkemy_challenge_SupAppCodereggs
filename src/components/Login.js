import React from "react";
import { useFormik } from "formik";
import { Alert, Form, Button } from "react-bootstrap";

const Login = ({ setLogueando }) => {
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
    initialValues: { email: "", password: "" },
    validate,
    onSubmit: (values) => {
      setLogueando(values);
      formik.handleReset();
    },
  });

  return (
    <div className="Inicio">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Label htmlFor="email" className="fw-bold">
          Correo Electrónico
        </Form.Label>
        <Form.Control
          id="email"
          name="email"
          type="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <Alert className="alertsLogin" variant="danger">
            {formik.errors.email}
          </Alert>
        ) : null}

        <Form.Label htmlFor="pass" className="fw-bold">
          Contraseña
        </Form.Label>
        <Form.Control
          id="pass"
          name="password"
          type="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.errors.password ? (
          <Alert className="alertsLogin" variant="danger">
            {formik.errors.password}
          </Alert>
        ) : null}

        <Button type="submit" className="mt-2 rounded btn-hero">
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default Login;
