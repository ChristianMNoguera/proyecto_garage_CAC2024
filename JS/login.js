//la variable que llamamos miFormUser y miFormOwner toma el metodo del objeto (getElementById) del
//documento para tomar el id de los formulario (formularioUser y formOwner) del doc login.html que
//los identifica por su id

document.addEventListener("DOMContentLoaded", function() {
    let miFormUser = document.getElementById('formularioUser');
    let miFormOwner = document.getElementById('formularioOwner');
    //con adsEventListener agregamos un evento cuando se genere el evento submit llamando a la funcion 
    //prevenirCarga. claramente  los dos formularios usan addEventListener es un callback es decir una 
    //funcion que usa como parametro una funcion 
    //

    miFormUser.addEventListener("submit", prevenirCarga);
    miFormOwner.addEventListener("submit", prevenirCarga);
    //la funcion prevenir carga evita que se comporte predeterminadamente es decir, mediante enviarlo
    //hay un ifElse que condiciona el evento llamando a la funcion validarCorreo. Lo que retorne esa
    //funcion hace que el evento submit arroje dos tipos de alerta de mensajes
    function prevenirCarga(event) {
        event.preventDefault();
        if (validarCorreo(event.target)) {
            alert("Enjoy! enviaste el formulario!!!");
        } else {
            alert("UPS! Por favor, revisa el ingreso del correo nuevamente.");
        }
    }
    //acá analizamo lo que el usuario ingresó, tanto usuario y propietario: 
    function validarCorreo(form) {
        let correo;
        if (form.id === "formularioUser") {
            correo = form.querySelector("#varEmailUser").value;
        } else if (form.id === "formularioOwner") {
            correo = form.querySelector("#varEmailOwner").value;
        }

        let conteoArroba = 0;
        let conteoPuntosDespuesArroba = 0;
        let despuesArroba = false;
    //el sting del usuario es recorrido con un bucle condicional por cad i
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
// Este eventListener detecta cambios en la opción "Propietario de Garaje" (checkbox) y
// muestra u oculta los campos relacionados según sea necesario.
document.getElementById('garageOwner').addEventListener('change', function() {
    const garageFields = document.getElementById('garageOwnerFields');
    if (this.checked) {
        garageFields.style.display = 'block';
    } else {
        garageFields.style.display = 'none';
    }
});

//en definitiva, esto analiza del objeto solo si login.html los id formulaioUse y formularioOwner la validacion simultánea
//el ingreso de correo

 
  
    
