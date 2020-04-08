const axios = require("axios");

const getClima = async(lat, lng) => {
    const respuesta = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=2735f7db565f60d393cb44191f359423&units=metric`
    );

    return respuesta.data.main.temp;
};

module.exports = {
    getClima,
};