import { Alert } from "react-bootstrap";
import React from "react";

export const ErrMessage = ({ smsg, msg, setShow }) => {
  const style = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  };
  return (
    <>
      <Alert
        variant="danger"
        onClose={() => setShow(false)}
        dismissible
        style={style}
      >
        <Alert.Heading>Error {smsg}</Alert.Heading>
        <p>{msg}</p>
      </Alert>
    </>
  );
};
