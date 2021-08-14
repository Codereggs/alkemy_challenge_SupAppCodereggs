const axios = require("axios");

export const postUser = async (url, data) => {
  try {
    const datosEnviados = await axios.post(url, data);
    window.localStorage.setItem(
      "token",
      JSON.stringify(datosEnviados.data.token)
    );
    return datosEnviados.data;
  } catch (err) {
    let error = err.response;
    return error;
  }
};

export const getData = async (url) => {
  try {
    const dataAx = await axios.get(url);
    return dataAx.data;
  } catch (err) {
    let error = err.response;
    return error;
  }
};

export const postRegistration = async (url, values) => {
  try {
    const dataAx = await axios({
      method: "post",
      url: url,
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      },
    });
    return dataAx;
  } catch (err) {
    let error = err.response;
    return error;
  }
};
