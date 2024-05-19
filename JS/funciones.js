//validar los 2 campos del formulario de login. si están bien, se manda al backend.

export function validarForm(form) {
    form.preventDefault();
    console.log("inicio funcion");
    let _formulario = form.currentTarget;
    console.log(_formulario);

    for (let i = 0; i < _formulario.length; i++) {

        const inputs = _formulario[i];
        console.log(inputs);

        switch (inputs.type) {
            case "text":
                console.log("campo de texto");
                break;
            case "password":
                console.log("campo de password");
                break;
            default:
                console.log("ninguno de los anteriores");
                break;
        }

    }

}//fin funcion//












/* export function loginForm(event) {

    event.preventDefault();

    let usernameHTML = document.getElementById("username");

    let passwordHTML = document.getElementById("password");

    let submitHTML = document.getElementById("btnCargar");

//preparar un JSON para enviar al backend

let data = {
    username: usernameHTML.value,
    password: passwordHTML.value,
}
//defino constante de url loing para pasar al fetch
const URL_LOGIN = "https://dummyjson.com/auth/login";

//creo el request, con el objeto data
let request = {
    method: "POST",
    header: { "Content-Type": 'application/json' },
    body: JSON.stringify(data)
}

// realizo el fetch

fetch(URL_LOGIN, request)
    .then(() =>  alert("salio bien"))
    .catch(() => alert("salio mal"))

    .finally(() => alert("fin"))
};
 */