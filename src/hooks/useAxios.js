/* eslint-disable no-throw-literal */
import { useState, useEffect } from "react";
const axios = require("axios");

export const useAxios = (url) => {
  const [data, setData] = useState(null);
  const [powerstats, setPowerstats] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const getUser = async (url) => {
      //Si la url está vacia no hay datos para buscar
      if (url === "") return true;
      try {
        const response = await axios.get(url),
          json = await response.data;

        //Si ocurre un error que muestre que ha ocurrido un error
        if (json.response === "error") throw json;

        //Cambiamos los estados
        setData(json);
        let power = {
          inteligencia: json.powerstats.intelligence,
          fuerza: json.powerstats.strength,
          velocidad: json.powerstats.speed,
          durabilidad: json.powerstats.durability,
          poder: json.powerstats.power,
          combate: json.powerstats.combat,
        };

        let detalles = {
          peso: json.appearance.weight[1],
          altura: json.appearance.height[1],
          nombre: json.biography.fullName,
          alias: json.biography.aliases,
          color_de_ojos: json.appearance.eyeColor,
          color_de_cabello: json.appearance.hairColor,
          lugar_de_trabajo: json.work.base,
        };

        setDetails((detallesTodos) => [detalles]);
        return setPowerstats((powerstats) => [power]);
      } catch (error) {
        if (error.error === "invalid id") return true;
        return alert("Ha ocurrido el siguiente error: " + error.error);
      }
    };
    getUser(url);
  }, [url]);

  return { data, powerstats, details };
};
