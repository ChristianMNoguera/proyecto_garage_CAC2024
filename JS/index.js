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

//esta funcion se va a usar cada vez que se presione, se suelte una tecla o cambie el foco en alguno de los inputs excepto el textarea. El argumento a pasar es el evento "keyup", "keydown", o "blur". cada evento lleva mucha informacion dentro. por eso dentro del switch se evalua el e.target.id o por ej: keyup.target.id
function checkInputs(e) {
    switch (e.target.id) {//el switch determina cual es la id de donde se está haciendo click.
        case "form_name":
            if (e.target.value.trim() !== "") {//aca scamos los espacios de delante y detras del input si se ingreso alguno y se evalua si NO ES VACIO
                validarObj.nombre = true;
                document.getElementById('form_name').classList.add('input_correcto');
                document.getElementById('form_name').classList.remove('input_incorrecto');
            } else {
                validarObj.nombre = false;
                document.getElementById('form_name').classList.add('input_incorrecto');
                document.getElementById('form_name').classList.remove('input_correcto');

            }
            break;
        case "form_lastname":
            if (e.target.value.trim() !== "") {
                validarObj.apellido = true;
                document.getElementById('form_lastname').classList.add('input_correcto');
                document.getElementById('form_lastname').classList.remove('input_incorrecto');
            } else {
                validarObj.apellido = false;
                document.getElementById('form_lastname').classList.add('input_incorrecto');
                document.getElementById('form_lastname').classList.remove('input_correcto');
            }
            break;
        case "form_email":
            let email = e.target.value; //para el input mail obtengo el valor ingresado, cada vez que se agrega o se borra un digito.
            email.trim(); //le borro los espacios que pueda tener adelante y detrás

            //en lo siguiente, evaluo con search si el valor email posee como mínimo una arroba.
            let arrobasUna = email.search('@');

            //aqui evaluo si lo ingresado se puede separar en un array, usando la arroba como desencadenante de la separacion. de haber una, se creará un array con 2 elementos, si hay 2 arrobas, el array tendra 3 elementos, y asi.
            let arrobasMas = email.split('@');

            //aqui verifico, primero si se econtró al menos una arroba, y luego si el array divisor contiene exactamente 2 elementos, lo cual implica que hay una y solo una arroba.
            if ((arrobasUna > 0) && (arrobasMas.length == 2)) {
                validarObj.email = true;
                console.log(validarObj.email);
                document.getElementById('form_email').classList.add('input_correcto');
                document.getElementById('form_email').classList.remove('input_incorrecto');
            } else {
                validarObj.email = false;
                document.getElementById('form_email').classList.add('input_incorrecto');
                document.getElementById('form_email').classList.remove('input_correcto');
                console.log(validarObj.email);
            }
            break;
    }
}

//creo un objeto para guardar las validaciones de cada campo y un metodo para autoevaluar si el form es valido o no.
let validarObj = {
    nombre: false,
    apellido: false,
    email: false,
    validar() {
        if (this.nombre && this.apellido && this.email) {
            return 'Valido';
        } else {
            return 'Invalido';
        };
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

//aqui agrego el listener al form para cada vez que se presiona una tecla.
contactForm.addEventListener('keydown', (event) => {
    console.log(event);
    checkInputs(event); //se ejecuta la funcion de chequeo
});

//aqui agrego el listener al form para cada vez que se suelta una tecla.
contactForm.addEventListener('keyup', (event) => {
    console.log(event);
    checkInputs(event);//se ejecuta la funcion de chequeo
});

//aqui agrego el listener al form para cada vez que un input pierde "foco".
contactForm.addEventListener('blur', (event) => {
    console.log(event);
    checkInputs(event);
});

let regexp = /^[0-4][0-9]  /


//funcion para validar finalmente el form al presionar submit.
function validarContactForm(e) {
    e.preventDefault();
    console.log('validando formulario...');
    console.log(validarObj.validar());
    alert('El formulario se envió con éxito');
    contactForm.reset();
};