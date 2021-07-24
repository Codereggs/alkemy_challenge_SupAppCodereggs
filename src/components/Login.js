import React from "react";
import { Formik } from "formik";

export default function Login() {
  return (
    <>
      <h2>Login</h2>
      <form action="" />
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" />
      <label htmlFor="pass">Password</label>
      <input type="password" name="pass" id="pass" />
      <button type="submit">Enviar</button>
      <form />
    </>
  );
}
