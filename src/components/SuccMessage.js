import { Alert } from "react-bootstrap";
import React from "react";

export const SuccMessage = ({ smsg, msg, setShow }) => {
  const style = {
    position: "absolute",
    top: "1rem",
    left: "1rem",
  };
  setTimeout(() => {
    setShow(false);
  }, 5000);
  return (
    <>
      <Alert
        variant="success"
        onClose={() => setShow(false)}
        dismissible
        style={style}
      >
        <Alert.Heading>{smsg}</Alert.Heading>
        <p>{msg}</p>
      </Alert>
    </>
  );
};
