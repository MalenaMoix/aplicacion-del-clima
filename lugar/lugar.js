//Importamos el axios
const axios = require("axios");

const getLugarLatLng = async(direccion) => {
    const url = encodeURI(direccion);

    //Para realizar la peticion, la API de Geo Location requiere headers entonces tengo que configurarlos
    //Vamos a crear una instancia de la peticion y configurar cada una de las opciones
    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${url}`,
        headers: {
            "x-rapidapi-key": "aed263cf30msh4d9d19a3a400374p11ad9ajsn9aa97a29ffa6",
        },
    });

    //Ahora vamos a ejecutar esta instancia de la peticion
    //Lo puedo hacer asi, pero voy a usar el asyn y await
    /*instance
                  .get()
                  .then((respuesta) => {
                      console.log(respuesta.data.Results[0]);
                  })
                  .catch((error) => {
                      console.log("ERROR!!!", error);
                  });*/

    const respuesta = await instance.get();

    if (respuesta.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${direccion}`);
    }

    const data = respuesta.data.Results[0];
    const direccionObtenida = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        direccion: direccionObtenida,
        lat,
        lng,
    };
};

module.exports = {
    getLugarLatLng,
};