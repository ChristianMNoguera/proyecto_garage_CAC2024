// active-nav.js
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav__link');
    const currentUrl = window.location.href;

    links.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add('active');
        }
    });
});

document.querySelector('.menu-btn').addEventListener('click', function () {
    document.querySelector('.nav__ul').classList.toggle('active');
});

const expReg = /(\d)/

//esta funcion se va a usar cada vez que se presione, se suelte una tecla o cambie el foco en alguno de los inputs excepto el textarea. El argumento a pasar es el evento "keyup", "keydown", o "blur". cada evento lleva mucha informacion dentro. por eso dentro del switch se evalua el e.target.id o por ej: keyup.target.id
function checkInputs(e) {
    switch (e.target.id) {//el switch determina cual es la id de donde se está haciendo click.
        case "form_name":
            if ((e.target.value.trim() !== "") && (!expReg.test(e.target.value))) {//aca scamos los espacios de delante y detras del input si se ingreso alguno y se evalua si NO ES VACIO
                validarObj.nombre = true;
                document.getElementById('form_name').classList.remove('input_incorrecto');
                document.getElementById('form_name').classList.add('input_correcto');
            } else {
                validarObj.nombre = false;
                document.getElementById('form_name').classList.remove('input_correcto');
                document.getElementById('form_name').classList.add('input_incorrecto');
            }
            break;
        case "form_lastname":
            if ((e.target.value.trim() !== "") && (!expReg.test(e.target.value))) {
                validarObj.apellido = true;
                document.getElementById('form_lastname').classList.remove('input_incorrecto');
                document.getElementById('form_lastname').classList.add('input_correcto');

            } else {
                validarObj.apellido = false;
                document.getElementById('form_lastname').classList.remove('input_correcto');
                document.getElementById('form_lastname').classList.add('input_incorrecto');
            }
            break;
        case "form_email":
            let email = e.target.value; //para el input mail obtengo el valor ingresado, cada vez que se agrega o se borra un digito.
            email.trim(); //le borro los espacios que pueda tener adelante y detrás

            //en lo siguiente, evaluo con search si el valor email posee como mínimo una arroba, y se devuelve el index de la primer arroba encontrada.
            let arrobasUna = email.search('@');
            console.log('posicion de la arroba =' + arrobasUna);

            //aqui evaluo si lo ingresado se puede separar en un array, usando la arroba como desencadenante de la separacion. de haber una, se creará un array con 2 elementos, si hay 2 arrobas, el array tendra 3 elementos, y asi.
            let arrobasMas = email.split('@');
            console.log('esto debe ser un array cuando hay una arroba ingresada: ' + arrobasMas);

            let puntoCom = email.substring(arrobasUna + 1);//aca obtengo la subcadena luego de la arroba, para analizar si contiene un dominio valido(.com, .com.ar, .net, etc)
            console.log('dominio del correo =' + puntoCom);

            let dominioEmail = puntoCom.split('.');//divido la subcadena del dominio cuando presenta al menos un punto.
            console.log(dominioEmail);
            console.log(dominioEmail.length);

            //aqui verifico, primero si se econtró al menos una arroba, y luego si el array de @ contiene exactamente 2 elementos, lo cual implica que hay una y solo una arroba y si el array de dominio tiene al menos 2 elementos, lo cual implica que al menos hay un punto.

            if ((arrobasUna > 0) && (arrobasMas.length == 2) && (dominioEmail.length > 1)) {
                validarObj.email = true;
                document.getElementById('form_email').classList.remove('input_incorrecto');
                document.getElementById('form_email').classList.add('input_correcto');
            } else {
                validarObj.email = false;
                document.getElementById('form_email').classList.remove('input_correcto');
                document.getElementById('form_email').classList.add('input_incorrecto');
            }
            break;
    }
}

//creo un objeto para guardar las validaciones de cada campo y un metodo para autoevaluar si el form es valido o no cuando se ejecuta la funcion de validar al submit el form.
let validarObj = {
    nombre: false,
    apellido: false,
    email: false,
    faltan: [], //este array se define para guardar los campos que faltan validar y luego retornarlos.
    validar() {
        this.faltan = []; /* se vacia el array para que no acumule campos en cada iteracion  */

        if (!this.nombre || !this.apellido || !this.email) { //si alguno de estos valores es falso, se ejecuta el guardado de la propiedad que da falso del objeto

            Object.entries(this).forEach(([key, valor]) => { //object.entries devuelve el par [propiedad, valor] para cada una de las mismas del objeto. para cada una de esas, ejecutamos el bloque:

                if (valor == false) { //si el valor del par es falso, guardamos la key asosiada.
                    this.faltan.push(key);
                }
            });
            return this.faltan; // al final del bucle de pares key,valor, se devuelve el array "faltan" que tiene qué campos faltan validar.
      
        } else {
            return true; //si no hay ningun valor falso, se devuelve true para darle curso a la validacion.
        }
    }
}

//obtengo los formularios que tengan la clase indicada. en este caso solo uno.
let formularios = document.getElementsByClassName('contact-form');
let contactForm = formularios[0];

//funcion resetar campos para borrar los estilos de correcto/incorrecto del form aparte de borrar valores
const resetearCampos = () => {
    contactForm.reset();
    let allinputs = document.getElementsByTagName("input"); //obtengo todos los inputs del form.

    for (i in allinputs) {
        allinputs[i].classList.remove('input_correcto');
        allinputs[i].classList.remove('input_incorrecto');
    }
};

/* //aqui agrego el listener al form para cada vez que se presiona una tecla.
contactForm.addEventListener('keydown', (event) => {
    checkInputs(event); //se ejecuta la funcion de chequeo
}); */

//aqui agrego el listener al form para cada vez que se suelta una tecla.
contactForm.addEventListener('keyup', (event) => {
    checkInputs(event);//se ejecuta la funcion de chequeo
});

//aqui agrego el listener al form para cada vez que un input pierde "foco".
contactForm.addEventListener('blur', (event) => {
    checkInputs(event);
});


//funcion PRINCIPAL  para validar finalmente el form al presionar submit.
function validarContactForm(e) {
    e.preventDefault();
    console.log('validando formulario...');
    if (validarObj.validar() == true) { //se evalua si el metodo del objeto devuelve true, de ser asi está tood correcto

        alert('formulario enviado con exito')

    } else {

        alert(`faltan ingresar los siguientes datos: ${validarObj.faltan}`) //si no está todo correcto, el metodo devuelve los campos que faltan en el array.
    }
    contactForm.reset(); //se reseta el form luego del envio.
}

/* the end */