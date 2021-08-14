import React from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import { Loader } from "./Loader";

export const ModalSignIn = ({ show, handleClose, setRegistrando, loader }) => {
  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Campo vacío.";
    } else if (!/^[a-zA-Z ]{2,254}$/gi.test(values.firstName)) {
      errors.firstName = "Solo letras y espacios en blanco.";
    }

    if (!values.lastName) {
      errors.lastName = "Campo vacío.";
    } else if (!/^[a-zA-Z ]{2,254}$/gi.test(values.lastName)) {
      errors.lastName = "Solo letras y espacios en blanco.";
    }

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

    if (!values.cPassword) {
      errors.cPassword = "Campo vacío.";
    } else if (values.password !== values.cPassword) {
      errors.cPassword = "Las contraseñas no coinciden.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validate,
    onSubmit: (values) => {
      setRegistrando(values);
      formik.handleReset();
    },
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} className="form-sign-in">
          <Form.Label htmlFor="email" className="fw-bold">
            Nombre
          </Form.Label>
          <Form.Control
            id="firstName"
            name="firstName"
            type="firstName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.errors.firstName ? (
            <Alert className="alertsSignIn" variant="danger">
              {formik.errors.firstName}
            </Alert>
          ) : null}
          <Form.Label htmlFor="lastName" className="fw-bold">
            Apellido
          </Form.Label>
          <Form.Control
            id="lastName"
            name="lastName"
            type="lastName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.errors.lastName ? (
            <Alert className="alertsSignIn" variant="danger">
              {formik.errors.lastName}
            </Alert>
          ) : null}
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
            <Alert className="alertsSignIn" variant="danger">
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
            <Alert className="alertsSignIn" variant="danger">
              {formik.errors.password}
            </Alert>
          ) : null}
          <Form.Label htmlFor="cPassword" className="fw-bold">
            Confirmar Contraseña
          </Form.Label>
          <Form.Control
            id="cPassword"
            name="cPassword"
            type="password"
            value={formik.values.cPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.cPassword ? (
            <Alert className="alertsSignIn" variant="danger">
              {formik.errors.cPassword}
            </Alert>
          ) : null}

          {loader ? (
            <Loader style={{ margin: "0 auto" }} />
          ) : (
            <Button type="submit" className="mt-2 rounded btn-hero">
              Enviar
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};
