// var datos = data.eventos

getData()

var objetodatos;
async function getData() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
    .then(response => response.json())
    .then(data => objetodatos = data);

var datos = objetodatos.events

function detalles(){
    var idDato = 1
    datos.map(dato => dato.id = idDato++)
    var id = location.search.split("?id=").filter(Number)
    var idSeleccionado = Number(id[0])
    var Datos = datos.find((Dato) => {
        return Dato.id == idSeleccionado
    })
    var templatehtml = `<div class="card d-flex align-items-center" style="width: 20rem; height: 30rem;">
    <img src="${Datos.image}" class="card-img-top imagenes" style="height: 19vh;" alt="...">
    <div class="card-body d-flex flex-column justify-content-around">
    <h5 class="card-title">${Datos.name}</h5>
    <p>${Datos.date}</p>
    <p class="card-text">${Datos.description}</p>
    <p>Place: ${Datos.place}</p>
    <p>Capacity: ${Datos.capacity}</p>
    <div class="d-flex flex-row justify-content-around">
    <h5>Price: $${Datos.price}</h5>
    </div>
    </div>
</div>`

document.querySelector("#card-details").innerHTML = templatehtml

}
detalles()
}
