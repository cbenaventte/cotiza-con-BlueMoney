//importamos modulos
const fs = require('fs')
const https = require('https');

const argumentos = process.argv.slice(2);

let nombreArchivo = argumentos[0];
let extensionArchivo = argumentos[1];
let indicadorEconomico = argumentos[2];
let cantidadEnpesos = Number(argumentos[3]);

https
    .get('https://mindicador.cl/api',(resp) => {
        resp.on('data',(data) => {

             let indicadores = JSON.parse(data);
             let valorDivisa = indicadores[`${indicadorEconomico}`].valor;

             let cantidadDivisa = (cantidadEnpesos/valorDivisa).toFixed(2);

                // console.log(indicadores)
                // console.log(valorDivisa)
                 //console.log( cantidadDivisa)

                 
                 // aqui creamos el archivo 
                 fs.writeFile(`${nombreArchivo}.${extensionArchivo}`, 
                 `A la fecha: ${Date()}\nFue realizada cotización con los siguientes datos:\nCantidad de pesos a convertir: ${cantidadEnpesos}\nConvertido a ${indicadorEconomico} da un total de:\n$${ cantidadDivisa}`,
                 'utf8', () => {
                 console.log('Archivo creado con éxito')
                 })
                  // leemos el archivo y lo mostramos por consola
                 fs.readFile(`${nombreArchivo}.${extensionArchivo}`, 'utf8', (err, data) => {
                    console.log('Contenido del archivo:\n'+ data)
                                            })
             
        })
    })  
    .on('error',(err) => {
        console.log('Error: ' + err.message)
    })