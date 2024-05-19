const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

let centroBsAs = [-34.607379, -58.383408];
let marcadores = [];
let mapaActual;
let iconMarker = L.icon({
    iconUrl:'../Media/img/img_icono_mapa_32.png',
    iconSize:[32,42],
    iconAnchor:[16, 40]
})
var popUp = L.popup();

 const escuchaClickLista = () => {
    document.querySelectorAll(".esta_nombres").forEach((nombre_esta,indice) =>{
        nombre_esta.addEventListener("click", ()=>{
            marcadores[indice].openPopup();
        })
    })
} 

/* const escuchaClick = () => {
    const lista = document.getElementsByClassName('esta_nombres');
    lista.addEventListener("click", (event)=> {
    console.log(lista.e.target);

})} */

function mostrarPopUp(evento){
    popUp
    .setLatLng(evento.latlng)
    .setContent("has clickeado el mapa en <br>" + evento.latlng.toString())
    .openOn(mapaActual);
}

const cargarLista = () => {
    let parkingHTML="";
    parking.forEach(park=>{
        parkingHTML += `<h4 class="esta_nombres"> ${park.nombre} </h4>`;
    })
    document.getElementById('estaNombres').innerHTML = parkingHTML;
}

const crearMarcador = ()=> {
    for (i in parking) {
        let marcador_ = L.marker([parking[i].lat, parking[i].lng], { icon: iconMarker}).addTo(mapaActual);
        marcador_.bindPopup(`nombre: ${parking[i].nombre} <br> direccion: ${parking[i].direccion} `);
        marcadores.push(marcador_);
    }
}

function cargarMapa() {
    mapaActual = L.map('mapa__main').setView(centroBsAs, 13);
    L.tileLayer(tilesProvider, {
        maxZoom: 80,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapaActual);
}

cargarMapa();

crearMarcador();

cargarLista();

escuchaClickLista();

mapaActual.on('contextmenu', mostrarPopUp);

console.log(marcadores);


