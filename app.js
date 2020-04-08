//Para poner comandos directamente o configurar argumentos directamente en la raiz de la aplicacion o del comando
const argv = require("yargs").options({
    direccion: {
        alias: "d",
        desc: "Direccion de la ciudad para obtener el clima",
        demand: true,
    },
}).argv;

const { getLugarLatLng } = require("./lugar/lugar");
const { getClima } = require("./clima/clima");

//getLugarLatLng es una funcion async, entonces va a retornar una respuesta
//getLugarLatLng(argv.direccion).then(console.log);

//getClima(-31.620001, -58.5).then(console.log).catch(console.log);

//MI SOLUCION, ANDUVO BIEN
/*
const getInfo = (direccion) => {
    getLugarLatLng(direccion).then((direccionObtenida) => {
        getClima(direccionObtenida.lat, direccionObtenida.lng).then((clima) => {
            console.log(`El clima de ${direccion} es de ${clima} grados`);
        });
    });
};

getInfo(argv.direccion);*/

//SOLUCION DADA
const getInfo = async(direccion) => {
    try {
        const coordenadas = await getLugarLatLng(direccion);

        const temp = await getClima(coordenadas.lat, coordenadas.lng);

        return `El clima de ${direccion} es de ${temp} grados`;
    } catch (e) {
        return `No se puedo determinar el clima de ${direccion}`;
    }
};

getInfo(argv.direccion).then(console.log).catch(console.log);