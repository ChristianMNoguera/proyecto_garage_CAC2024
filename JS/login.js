// //trabajando por 2 archivos separados, ya puedo importar la funcion que todavia no existe//
// import { validarForm } from './funciones.js';

// //agarro los formularios que pueden llegar a haber en la pàgina, en este caso son 2. user y pres.//
// let miForm = document.getElementsByTagName('form');

// console.log(miForm);//esto es un array, una collecion de elementos html//

// let _formulario = miForm[0];

// console.log(_formulario);

// //reseteo el formulario(campos) cada vez de cargar la pàgina de 0//
// _formulario.reset();

// //al obtener el evento onsubmit, llamo a la funcion importada de otro archivo//
// _formulario.onsubmit = validarForm;

// console.log("js inicial cargado.");

document.getElementById('garageOwner').addEventListener('change', function() {
    const garageFields = document.getElementById('garageOwnerFields');
    if (this.checked) {
        garageFields.style.display = 'block';
    } else {
        garageFields.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let miForm = document.getElementById('formulario');
  //la variable que llamamos miForm toma el metodo del objeto documento para tomar el id
  //del formulario formularioUser
  // con adsEventListener agregamos un evento cuando se genere el evento submit llamando a la funcion 
  //prevenirCarga. claramente miForm.addEventListener es un callback es decir una funcion que usa
  //como parametro una funcion 

    miForm.addEventListener("submit", prevenirCarga);
  // dentro de el evento generado preventDefaul evita el evento "de entregar" el form con submit
  //aparece un condicional que llama a validarCorreo que dispara dos tipo de aviso al user si escribio
  //mal o bien el email.
    function prevenirCarga(event) {
        event.preventDefault();
        if (validarCorreo()) {
            alert("ENJOY! ENVIASTE EL FORMULARIO!! ");
        } else {
            alert("UPS, PARECE QUE ALGO SALIO MAL AL ESCRIBIR EL CORREO, INTENTA NUEVAMENTE");
        }
    }
  // Aca la funcion donde ingresa el string que pone el usuario que lo deposita en la variable correo
  // que recorre el objeto login.html hasta encontrar el id "varEmail" y toma el valor
  // luego las otras asignaciones de variables son lo que dice cuenta la cantidad de "@" "."
  //y establecemos las condicionales en cada string mediante recorrer con i cada caracter y le ponemos 
  //condiciones
  //luego del for estan las condiciones
    function validarCorreo() {
        let correo = document.getElementById("varEmail").value;
        let conteoArroba = 0;
        let conteoPuntosDespuesArroba = 0;
        let despuesArroba = false;
  
        for (let i = 0; i < correo.length; i++) {
            if (correo[i] === '@') {
                if (i === 0 || correo[i - 1] === ' ') {
                    return false; // Si '@' está al inicio o precedido por un espacio, no es válido
                }
                conteoArroba++;
                despuesArroba = true; // Se establece en verdadero después de encontrar el primer '@'
            } else if (despuesArroba && correo[i] === '.') {
                conteoPuntosDespuesArroba++; // Contar puntos después del primer '@'
            } else if (despuesArroba && correo[i] === ' ') {
                return false; // Si hay un espacio después del '@', no es válido
            }
        }
  
        // Verificar si hay exactamente un '@' y al menos un punto después del primer '@'
        if (conteoArroba !== 1 || conteoPuntosDespuesArroba < 1) {
            return false; // No es un correo electrónico válido
        }
        if (conteoArroba !== 1 || conteoPuntosDespuesArroba > 2) {
            return false; // No es un correo electrónico válido
        }
        return true; // Es un correo electrónico válido
    }
  });

