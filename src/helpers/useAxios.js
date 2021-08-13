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
